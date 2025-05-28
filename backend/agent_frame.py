# === agent_framework.py ===
# 功能：AI 企业运营协同系统原型，支持任务分发、客户反馈分析、社交情绪分析、报告生成
# 增强项：Agent 状态监控面板、执行日志、异常日志、Google Docs 集成、图表可视化、并发处理、Gradio Web UI

import os
import csv
import datetime
import matplotlib.pyplot as plt
import gradio as gr
import vertexai
from vertexai.language_models import ChatModel
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.http import MediaFileUpload
from concurrent.futures import ThreadPoolExecutor
import traceback

# 初始化 Vertex AI
vertexai.init(project="your-gcp-project-id", location="us-central1")

SCOPES = [
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive"
]

class Logger:
    def __init__(self):
        self.logs = []

    def log(self, message):
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        self.logs.append(f"[{timestamp}] {message}")

    def get_logs(self):
        return "\n".join(self.logs[-10:])

logger = Logger()

class GoogleDocsAgent:
    def __init__(self):
        self.creds = None
        if os.path.exists("token.json"):
            self.creds = Credentials.from_authorized_user_file("token.json", SCOPES)
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
                self.creds = flow.run_local_server(port=0)
            with open("token.json", "w") as token:
                token.write(self.creds.to_json())
        self.docs_service = build("docs", "v1", credentials=self.creds)
        self.drive_service = build("drive", "v3", credentials=self.creds)

    def upload_image_to_drive(self, image_path):
        file_metadata = {"name": os.path.basename(image_path), "mimeType": "image/png"}
        media = MediaFileUpload(image_path, mimetype="image/png")
        uploaded = self.drive_service.files().create(
            body=file_metadata, media_body=media, fields="id"
        ).execute()
        file_id = uploaded.get("id")
        self.drive_service.permissions().create(fileId=file_id, body={"role": "reader", "type": "anyone"}).execute()
        return f"https://drive.google.com/uc?id={file_id}"

    def create_doc(self, title, content_sections, chart_path=None):
        doc = self.docs_service.documents().create(body={"title": title}).execute()
        document_id = doc["documentId"]
        requests = [{"insertText": {"location": {"index": 1}, "text": section + "\n\n"}} for section in content_sections]
        self.docs_service.documents().batchUpdate(documentId=document_id, body={"requests": requests[::-1]}).execute()
        if chart_path:
            image_url = self.upload_image_to_drive(chart_path)
            requests = [{
                "insertInlineImage": {
                    "location": {"index": 1},
                    "uri": image_url,
                    "objectSize": {"height": {"magnitude": 300, "unit": "PT"}, "width": {"magnitude": 400, "unit": "PT"}}
                }
            }]
            self.docs_service.documents().batchUpdate(documentId=document_id, body={"requests": requests}).execute()
        return f"https://docs.google.com/document/d/{document_id}/edit"

class TaskManagerAgent:
    def __init__(self):
        self.tasks = []
        self.model = ChatModel.from_pretrained("chat-bison@002")

    def parse_instruction(self, instruction):
        prompt = (
            f"你是一个任务分发助手。根据以下用户指令，判断需要完成的任务。"
            f"可能的任务包括：analyze_customer_feedback（分析客户反馈），"
            f"analyze_social_sentiment（分析社交媒体情绪）。"
            f"用户指令：'{instruction}'。"
            f"请输出需要完成的任务列表，格式为 JSON 数组，例如:[\"analyze_customer_feedback\", \"analyze_social_sentiment\"]"
        )
        chat = self.model.start_chat()
        response = chat.send_message(prompt)
        try:
            self.tasks = eval(response.text)
            logger.log(f"解析任务：{self.tasks}")
        except Exception as e:
            logger.log(f"任务解析失败：{e}")
            self.tasks = []
        return self.tasks

class CustomerAgent:
    def __init__(self, uploaded_feedback=None):
        self.feedback_data = uploaded_feedback or [
            "客服响应太慢", "服务态度很好", "退货流程复杂", "非常满意", "产品质量不错",
        ]

    def analyze_feedback(self):
        logger.log("CustomerAgent 开始执行")
        complaints = [f for f in self.feedback_data if any(k in f for k in ["慢", "复杂", "不好"])]
        praises = [f for f in self.feedback_data if any(k in f for k in ["满意", "很好", "不错"])]
        logger.log(f"CustomerAgent 完成：{len(self.feedback_data)} 条反馈分析")
        return {
            "total": len(self.feedback_data),
            "complaints": complaints,
            "praises": praises
        }

class MonitorAgent:
    def __init__(self):
        self.social_posts = [
            "体验很差，不推荐", "太棒了！设计一流", "一般般", "客服根本不回复", "超级喜欢这款新品"
        ]

    def analyze_sentiment(self):
        logger.log("MonitorAgent 开始执行")
        def classify(text):
            return "负面" if "差" in text or "不" in text else "正面" if "喜欢" in text or "棒" in text else "中性"
        result = [{"text": p, "sentiment": classify(p)} for p in self.social_posts]
        logger.log("MonitorAgent 完成情绪分析")
        return result

class ReportAgent:
    def generate_sections(self, customer_summary, sentiment_summary):
        sections = []
        if customer_summary:
            s = "【客户反馈分析】\n"
            s += f"总反馈数: {customer_summary['total']}\n"
            s += f"投诉（{len(customer_summary['complaints'])}）: {customer_summary['complaints']}\n"
            s += f"表扬（{len(customer_summary['praises'])}）: {customer_summary['praises']}"
            sections.append(s)
        if sentiment_summary:
            s = "【社交媒体情绪分析】\n"
            counts = {"正面": 0, "负面": 0, "中性": 0}
            for item in sentiment_summary:
                counts[item['sentiment']] += 1
                s += f"{item['text']} -> {item['sentiment']}\n"
            s += f"统计：{counts}"
            sections.append(s)
        return sections

    def plot_sentiment(self, sentiment_summary):
        counts = {"正面": 0, "负面": 0, "中性": 0}
        for item in sentiment_summary:
            counts[item['sentiment']] += 1
        labels = list(counts.keys())
        values = list(counts.values())
        plt.figure(figsize=(4, 3))
        plt.bar(labels, values, color=['green', 'red', 'gray'])
        plt.title("社交情绪分布")
        path = "sentiment_chart.png"
        plt.savefig(path)
        return path

def read_feedback_csv(file):
    decoded = file.decode("utf-8").splitlines()
    reader = csv.reader(decoded)
    next(reader, None)
    return [row[0] for row in reader if row]

def generate_ops_report(instruction, csv_file):
    logger.log("启动任务处理流程")
    task_agent = TaskManagerAgent()
    tasks = task_agent.parse_instruction(instruction)
    uploaded_feedback = read_feedback_csv(csv_file.read()) if csv_file else None
    customer_summary = None
    sentiment_summary = None

    with ThreadPoolExecutor() as executor:
        futures = {}
        if "analyze_customer_feedback" in tasks:
            customer_agent = CustomerAgent(uploaded_feedback)
            futures['customer'] = executor.submit(customer_agent.analyze_feedback)
        if "analyze_social_sentiment" in tasks:
            monitor_agent = MonitorAgent()
            futures['monitor'] = executor.submit(monitor_agent.analyze_sentiment)

        for key, future in futures.items():
            try:
                if key == 'customer':
                    customer_summary = future.result()
                elif key == 'monitor':
                    sentiment_summary = future.result()
            except Exception as e:
                logger.log(f"{key} Agent 执行失败：{e}\n{traceback.format_exc()}")

    report_agent = ReportAgent()
    sections = report_agent.generate_sections(customer_summary, sentiment_summary)
    chart_path = report_agent.plot_sentiment(sentiment_summary) if sentiment_summary else None
    doc_link = GoogleDocsAgent().create_doc("运营分析报告", sections, chart_path)
    logger.log(f"文档生成成功：{doc_link}")
    return doc_link, logger.get_logs()

# Gradio Web UI
with gr.Blocks(title="企业 AI 协同系统 Demo") as demo:
    gr.Markdown("## 📊 企业 AI 协同系统")
    with gr.Row():
        instruction = gr.Textbox(label="指令", value="请分析客户反馈和社交媒体情绪")
        file_upload = gr.File(label="上传客户反馈 CSV", type="binary")
    run_btn = gr.Button("生成报告")
    doc_output = gr.Textbox(label="报告链接")
    log_output = gr.Textbox(label="执行日志", lines=10)

    def process(instruction, file_upload):
        return generate_ops_report(instruction, file_upload)

    run_btn.click(process, inputs=[instruction, file_upload], outputs=[doc_output, log_output])

demo.launch()
