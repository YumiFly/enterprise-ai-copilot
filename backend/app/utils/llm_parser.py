
import os
from typing import List
from google import genai

# import google.generativeai as genai

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def parse_instruction_with_gemini(instruction: str) -> List[str]:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    # client = genai.Client(
    #     vertexai=True, project=os.getenv("PROJECT_ID"), location='us-central1'
    # )
    """
    使用 Gemini 模型解析用户指令，返回推荐任务列表。
    """
    prompt = f"""
    你是一个企业 AI 协同系统的任务规划专家。用户会发送任务指令，请判断这条指令应激活哪些任务模块。
    可选任务包括：
    - analyze_customer_feedback（分析客户反馈）
    - analyze_social_sentiment（分析社交媒体情绪）
    - summarize_conversation（总结多轮对话）
    - generate_business_insight（生成运营洞察）
    
    请返回一个 JSON 数组，仅包含需要执行的模块，例如：
    ["analyze_customer_feedback", "analyze_social_sentiment"]
    用户输入的指令如下：
    {instruction}
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        print(response.text)
        result = eval(response.text)
        if isinstance(result, list):
           return result
        return []
    except Exception:
        return []