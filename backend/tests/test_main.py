import io
import base64
import pytest
from fastapi.testclient import TestClient
from app.main import app
import random
import string
import os

client = TestClient(app)
print(TestClient)
print(TestClient.__module__)
def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "AI Task Coordination API is running."}

def test_parse_tasks_unauthorized():
    response = client.post("/parse-tasks", json={"instruction": "请分析客户反馈"})
    assert response.status_code == 401  # 未授权访问

def test_upload_customers_unauthorized():
    fake_csv = io.BytesIO(b"satisfaction,sentiment\n5,positive\n3,neutral")
    response = client.post(
        "/upload-customers",
        files={"file": ("test.csv", fake_csv, "text/csv")}
    )
    assert response.status_code == 401

def test_run_agents_unauthorized():
    fake_csv = io.BytesIO(b"satisfaction,sentiment\n5,positive\n1,negative")
    response = client.post(
        "/run-agents",
        data={"instruction": "请分析反馈"},
        files={"file": ("test.csv", fake_csv, "text/csv")}
    )
    assert response.status_code == 401

# TODO: 可扩展测试：
# - 注册新用户 /auth/register
# - 登录获取 token /auth/token
# - 鉴权访问 + 实际执行 /parse-tasks, /run-agents 等
def generate_random_username():
    return "user_" + ''.join(random.choices(string.ascii_lowercase, k=6))

def test_auth_flow_and_parse_tasks():
    username = generate_random_username()
    password = "testpass123"

    # 注册新用户
    register_resp = client.post("/auth/register", data={"username": username, "password": password})
    assert register_resp.status_code == 200

    # 登录获取 token
    token_resp = client.post("/auth/token", data={"username": username, "password": password})
    assert token_resp.status_code == 200
    token = token_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 调用受保护接口（示例：任务解析）
    task_resp = client.post("/parse-tasks", json={"instruction": "请分析客户反馈"}, headers=headers)
    assert task_resp.status_code == 200
    assert "tasks" in task_resp.json()

def test_upload_and_run_agents():
    username = generate_random_username()
    password = "testpass123"

    # 注册用户
    client.post("/auth/register", data={"username": username, "password": password})
    # 登录获取 token
    token_resp = client.post("/auth/token", data={"username": username, "password": password})
    token = token_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 构造测试 CSV 内容
    csv_content = "comment,satisfaction,social_post,sentiment\n很好,5,体验不错,positive\n一般,2,不推荐,negative".encode('utf-8')
    fake_csv = io.BytesIO(csv_content)

    # 调用 /upload-customers
    upload_resp = client.post(
        "/upload-customers",
        headers=headers,
        files={"file": ("test.csv", fake_csv, "text/csv")}
    )
    assert upload_resp.status_code == 200
    assert "columns" in upload_resp.json()
    assert upload_resp.json()["num_rows"] == 2

    # 重新构造 CSV 数据流
    fake_csv.seek(0)

    # 调用 /run-agents
    run_resp = client.post(
        "/run-agents",
        headers=headers,
        data={"instruction": "请分析客户反馈和社交情绪"},
        files={"file": ("test.csv", fake_csv, "text/csv")}
    )
    assert run_resp.status_code == 200
    result = run_resp.json()
    assert "report_text" in result
    # assert "download" in result
    # assert result["download"]["word"].endswith(".docx")

def test_chat_ask_context_flow():
    username = generate_random_username()
    password = "testpass123"

    # 注册并登录
    client.post("/auth/register", data={"username": username, "password": password})
    token_resp = client.post("/auth/token", data={"username": username, "password": password})
    token = token_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 第一次请求，指令输入
    instruction_1 = "请分析客户反馈"
    resp1 = client.post("/chat/ask", headers=headers, json={"instruction": instruction_1})
    assert resp1.status_code == 200
    data1 = resp1.json()
    assert "tasks" in data1
    assert instruction_1 in data1["context"]

    # 第二次请求（模拟上下文累加）
    instruction_2 = "再加上社交媒体舆情分析"
    resp2 = client.post("/chat/ask", headers=headers, json={"instruction": instruction_2})
    assert resp2.status_code == 200
    data2 = resp2.json()
    assert instruction_1 in data2["context"]
    assert instruction_2 in data2["context"]
    assert "tasks" in data2

def test_static_report_file_access():
    # 假设我们人为创建一个静态 Word 报告
    reports_dir = "static/reports"
    os.makedirs(reports_dir, exist_ok=True)
    sample_file_path = os.path.join(reports_dir, "test_report.docx")
    
    with open(sample_file_path, "wb") as f:
        f.write(b"Sample Word report content")

    # 测试能否下载该文件
    response = client.get("/static/reports/test_report.docx")
    assert response.status_code == 200
    # assert response.headers["content-type"] in ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream"]
    # assert response.content.startswith(b"Sample")

    # 清理文件
    os.remove(sample_file_path)

def test_static_missing_file_404():
    # 访问一个不存在的文件路径
    response = client.get("/static/reports/nonexistent_report.docx")
    assert response.status_code == 404