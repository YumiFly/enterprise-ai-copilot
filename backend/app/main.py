# app/main.py
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
import pandas as pd
from pydantic import BaseModel
import asyncio
from utils.gcs import upload_to_gcs, download_from_gcs
from utils.task_router import route_tasks
from utils.agent_manager import run_agents_concurrently
from utils.report_generator import generate_word_report_with_chart
from utils.visualizer import generate_sentiment_chart
from auth.auth_handler import get_current_user, create_access_token
from db.models import init_db, TaskHistory, UserSession, User
from db.session import SessionLocal
from sqlalchemy.orm import Session
from chat.context import save_user_context, get_user_context
from jose import JWTError
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
from utils.report_exporter import export_report_to_word, export_report_to_pdf
from utils.llm_parser import parse_instruction_with_gemini
import uuid
import base64
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


load_dotenv()
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

os.makedirs("static/charts", exist_ok=True)
os.makedirs("static/reports", exist_ok=True)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
# Initialize DB
init_db()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Input model
class InstructionRequest(BaseModel):
    instruction: str

@app.get("/")
def root():
    return {"message": "AI Task Coordination API is running."}

@app.post("/parse-tasks")
async def parse_tasks(instruction_request: InstructionRequest, user=Depends(get_current_user)):
    task_list = parse_instruction_with_gemini(instruction_request.instruction)
    return {"tasks": task_list}

@app.post("/upload-customers")
async def upload_customers(file: UploadFile = File(...), user=Depends(get_current_user)):
    df = pd.read_csv(file.file)
    return {"columns": df.columns.tolist(), "num_rows": len(df)}

@app.post("/run-agents")
async def run_agents_api(
    file: UploadFile = File(...),
    instruction: str = "",
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 读取 CSV 数据
    df = pd.read_csv(file.file)

    # 解析任务
    task_list = parse_instruction_with_gemini(instruction)

    # 执行任务智能体
    results = await run_agents_concurrently(df, task_list)

    # 保存任务历史记录
    history = TaskHistory(
        user_id=user.id,
        instruction=instruction,
        tasks=",".join(task_list)
    )
    db.add(history)
    db.commit()

    # 提取报告内容
    feedback_text = results.get("feedback_summary", "")
    social_text = results.get("sentiment_summary", "")
    summary = results.get("summary_keywords", [])
    llm_summary = "关键词：" + ", ".join(summary) if summary else ""

    # 生成图表并保存本地
    chart_bytes = generate_sentiment_chart(results)
    report_id = str(uuid.uuid4())[:8]
    local_chart_path = f"static/charts/sentiment_chart_{report_id}.png"
    with open(local_chart_path, "wb") as f:
        f.write(chart_bytes)

    # 生成 Word 报告并上传至 GCS
    local_word_path = generate_word_report_with_chart(
        feedback_text=feedback_text,
        social_media_text=social_text,
        llm_summary=llm_summary,
        chart_path=local_chart_path,
        filename=f"report_{report_id}.docx"
    )

    # 可选 PDF 生成
    local_pdf_path = export_report_to_pdf(llm_summary, report_id)

    # 上传到 GCS
    word_url = upload_to_gcs(local_word_path, f"reports/{os.path.basename(local_word_path)}")
    pdf_url = upload_to_gcs(local_pdf_path, f"reports/{os.path.basename(local_pdf_path)}")
    chart_url = upload_to_gcs(local_chart_path, f"charts/sentiment_chart_{report_id}.png")

    sentiment_chart = base64.b64encode(chart_bytes).decode()

    return {
        "report_text": llm_summary,
        "sentiment_chart_base64": sentiment_chart,
        "download": {
            "word": word_url,
            "pdf": pdf_url,
            "chart": chart_url
        }
    }

@app.post("/auth/register")
def register(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    user = User(username=username, password=pwd_context.hash(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully"}

@app.post("/auth/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/chat/ask")
async def ask_question(request: InstructionRequest, user=Depends(get_current_user), db: Session = Depends(get_db)):
    # Load context
    context = get_user_context(db, user.id)
    full_instruction = context + "\n" + request.instruction
    response_tasks = parse_instruction_with_gemini(full_instruction)
    save_user_context(db, user.id, full_instruction)
    return {"tasks": response_tasks, "context": full_instruction}

@app.get("/download/{file_type}/{file_name}")
def download_report(file_type: str, file_name: str):
    gcs_path = f"{file_type}/{file_name}"
    try:
        file_stream = download_from_gcs(gcs_path)
        return StreamingResponse(
            file_stream,
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment; filename={file_name}"}
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found on GCS")