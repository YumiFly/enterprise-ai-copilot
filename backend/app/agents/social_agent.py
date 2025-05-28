class SocialAgent:
    async def run(self, df):
        total = len(df)
        sentiment_counts = df["sentiment"].value_counts().to_dict()
        summary = f"共处理 {total} 条社交数据，各类情绪占比如下：{sentiment_counts}"
        return {
            "sentiment_summary": summary,
            "sentiment_chart_data": sentiment_counts
        }