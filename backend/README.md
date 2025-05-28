# 🧠 Enterprise AI Copilot

<div align="center">
  <img src="https://img.shields.io/badge/FastAPI-0.104.1-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud" alt="Google Cloud" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker" alt="Docker" />
</div>

<div align="center">
  <h3>🚀 Your multi-agent assistant for smarter enterprise decisions</h3>
  <p>A modular, cloud-native multi-agent system that uses large language models (LLMs) and task-specific agents to help enterprises automate operations, analyze feedback, and generate insights.</p>
</div>

---

## ✨ Features

### 🎯 Core Intelligence
- **🧠 Instruction Parsing**: Interprets natural language commands into actionable tasks using Gemini Pro
- **🤖 Multi-Agent Execution**: Specialized agents (FeedbackAgent, SocialAgent) process data asynchronously
- **🔄 Task Orchestration**: Intelligent coordination through composable agent workflows
- **💬 Context Management**: Maintains conversation history and context across interactions

### 📊 Analytics & Reporting
- **📈 Smart Reports**: Automated Word/PDF export with embedded sentiment charts
- **📊 Data Visualization**: Real-time charts and analytics dashboards
- **🎯 Sentiment Analysis**: Advanced emotion and opinion tracking
- **📋 Custom Templates**: Flexible report generation with multiple formats

### ☁️ Cloud Integration
- **🌐 Google Cloud Storage**: Secure cloud-hosted reports and charts
- **🔐 Vertex AI Integration**: Powered by Google's Gemini Pro LLM
- **📡 Scalable Architecture**: Built for enterprise-grade performance
- **🔒 Security First**: JWT authentication and secure API endpoints

### 🛠️ Developer Experience
- **📚 OpenAPI Documentation**: Auto-generated Swagger UI
- **🧪 Comprehensive Testing**: Unit tests and integration testing
- **🐳 Docker Ready**: Containerized deployment with Docker Compose
- **🚀 CI/CD Pipeline**: Automated testing and deployment workflows

---

### 📦 Tech Stack
	- **Backend**: FastAPI + async + PostgreSQL (via SQLAlchemy)
	- **Agents**: Python modules implementing run() logic
	- **LLM**: Google Gemini Pro / Vertex AI
	- **Storage**: Google Cloud Storage (GCS)
	- **Deployment**: Docker + Cloud Run

---

### 🛠️ Getting Started

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

---

### 🧪 Run Tests

pytest tests/


---

### 📁 Directory Structure

app/
  agents/          # Agent implementations
  auth/            # User auth logic
  chat/            # Context management
  db/              # Models and sessions
  utils/           # LLM, GCS, reporting tools
  main.py          # FastAPI app entry point
static/            # Report/chart output files (if local)
tests/             # Unit tests


---

### 📚 Project Story

See our full story in PROJECT_STORY.md — includes what inspired us, how we built it, and challenges we solved.

---

### ✍️ License

MIT License © 2025