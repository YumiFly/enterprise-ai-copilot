🧠 Enterprise AI Copilot

Your multi-agent assistant for smarter enterprise decisions.

⸻

🚀 Overview

Enterprise AI Copilot is a modular, cloud-native multi-agent system that uses large language models (LLMs) and task-specific agents to help enterprises automate operations, analyze feedback, and generate insights.

Built on FastAPI, powered by Gemini Pro via Vertex AI, and designed in the style of Google’s Agent Development Kit (ADK), this project delivers intelligent coordination through composable agents.

⸻

✨ Features
	•	🧠 Instruction Parsing — Interprets natural language commands into actionable tasks using Gemini.
	•	🤖 Multi-Agent Execution — Agents like FeedbackAgent, SocialAgent process data asynchronously.
	•	📊 Smart Reports — Word/PDF export with embedded sentiment charts and LLM summaries.
	•	☁️ Google Cloud Storage Integration — Cloud-hosted reports and charts.
	•	🔐 Authentication — User registration, login, and JWT-protected routes.

⸻

📦 Tech Stack
	•	Backend: FastAPI + async + PostgreSQL (via SQLAlchemy)
	•	Agents: Python modules implementing run() logic
	•	LLM: Google Gemini Pro / Vertex AI
	•	Storage: Google Cloud Storage (GCS)
	•	Deployment: Docker + Cloud Run

⸻

🛠️ Getting Started

1. Clone the repo

git clone https://github.com/yourname/enterprise-ai-copilot.git
cd enterprise-ai-copilot

2. Setup environment

Create a .env file:

GEMINI_API_KEY=your-key-here
GCS_BUCKET_NAME=your-gcs-bucket
GOOGLE_APPLICATION_CREDENTIALS=/app/your-service-account.json

3. Install dependencies

pip install -r requirements.txt

4. Run locally

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Visit http://localhost:8000/docs for Swagger UI.

⸻

🧪 Run Tests

pytest tests/


⸻

📁 Directory Structure

app/
  agents/          # Agent implementations
  auth/            # User auth logic
  chat/            # Context management
  db/              # Models and sessions
  utils/           # LLM, GCS, reporting tools
  main.py          # FastAPI app entry point
static/            # Report/chart output files (if local)
tests/             # Unit tests


⸻

📚 Project Story

See our full story in PROJECT_STORY.md — includes what inspired us, how we built it, and challenges we solved.

⸻

✍️ License

MIT License © 2025