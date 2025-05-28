docker run -it  -p 8000:8000 -v /Users/tiantt/Documents/IDEA/Chinklink\ Hackson/enterprise-ai-copilot/backend:/app enterprise-ai-copilot-backend-v2 /bin/bash
cd /app && pip install --no-cache-dir -r requirements.txt
# python mian.py
uvicorn main:app --host 0.0.0.0 --port 8000 --reload