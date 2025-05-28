class FeedbackAgent:
    async def run(self, df):
        total = len(df)
        positive = (df["satisfaction"] > 3).sum()
        negative = (df["satisfaction"] <= 3).sum()
        summary = f"共收集反馈 {total} 条，其中正面反馈 {positive} 条，负面反馈 {negative} 条。"
        return {"feedback_summary": summary}