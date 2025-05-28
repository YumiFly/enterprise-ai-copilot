# utils/visualizer.py
import matplotlib.pyplot as plt
import io
import base64

# utils/visualizer.py 中的 generate_sentiment_chart 应该返回 bytes 而非 base64
def generate_sentiment_chart(results: dict) -> bytes:
    data = results.get("sentiment_chart_data", {"positive": 1, "neutral": 1, "negative": 1})
    labels = list(data.keys())
    sizes = list(data.values())

    fig, ax = plt.subplots()
    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
    ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return buf.read()

# def generate_sentiment_chart(results: dict):
#     if "sentiment_chart_data" not in results:
#         return ""
#     chart_data = results["sentiment_chart_data"]
#     fig, ax = plt.subplots()
#     ax.bar(chart_data.keys(), chart_data.values())
#     ax.set_title("社交情绪分布")

#     buf = io.BytesIO()
#     plt.savefig(buf, format='png')
#     buf.seek(0)
#     encoded = base64.b64encode(buf.read()).decode("utf-8")
#     return encoded
