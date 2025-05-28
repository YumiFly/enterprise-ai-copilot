# utils/agent_manager.py
import asyncio
from agents.feedback_agent import FeedbackAgent
from agents.social_agent import SocialAgent

async def run_agents_concurrently(df, task_list):
    tasks = []
    results = {}

    if "analyze_customer_feedback" in task_list:
        feedback_agent = FeedbackAgent()
        tasks.append(asyncio.create_task(feedback_agent.run(df)))

    if "analyze_social_sentiment" in task_list:
        social_agent = SocialAgent()
        tasks.append(asyncio.create_task(social_agent.run(df)))

    outputs = await asyncio.gather(*tasks)
    for result in outputs:
        results.update(result)
    return results
