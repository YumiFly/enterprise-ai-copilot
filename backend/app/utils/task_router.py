# utils/task_router.py
from vertexai.preview.generative_models import GenerativeModel
import vertexai
import asyncio

vertexai.init(project="your-gcp-project-id", location="us-central1")
model = GenerativeModel("gemini-1.5-pro-preview-0409")

async def route_tasks(instruction: str):
    prompt = f"你是一个任务分发助手。根据以下用户指令，判断需要完成的任务。可能的任务包括：analyze_customer_feedback（分析客户反馈），analyze_social_sentiment（分析社交媒体情绪）。用户指令：'{instruction}'。请输出需要完成的任务列表，格式为 JSON 数组，例如:[\"analyze_customer_feedback\", \"analyze_social_sentiment\"]"
    response = model.generate_content(prompt)
    raw_text = response.text
    return eval(raw_text)
