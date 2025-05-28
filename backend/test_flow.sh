#!/bin/bash

# ✅ 1. 随机用户名和固定密码
RAND=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 6 | head -n 1)
USERNAME="user_$RAND"
PASSWORD="testpass123"

echo "👤 注册新用户: $USERNAME"

# ✅ 2. 注册用户
curl -X POST http://localhost:8000/auth/register \
  -d "username=$USERNAME" -d "password=$PASSWORD"
echo -e "\n✅ 注册完成"

# ✅ 3. 登录获取 Token
TOKEN=$(curl -s -X POST http://localhost:8000/auth/token \
  -d "username=$USERNAME" -d "password=$PASSWORD" | jq -r .access_token)

if [[ "$TOKEN" == "null" ]]; then
  echo "❌ 登录失败，请检查后端服务或注册逻辑"
  exit 1
fi

echo "🔑 登录成功，Token 获取成功: $TOKEN"

# ✅ 4. 上传客户 CSV 数据
echo "📤 上传测试 CSV 数据"

echo -e "comment,satisfaction,social_post,sentiment\n很好,5,体验不错,positive\n一般,2,不推荐,negative" > test.csv

UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:8000/upload-customers \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@test.csv")

echo "$UPLOAD_RESPONSE" | jq

# ✅ 5. 调用 /parse-tasks 接口
echo "🧠 调用 /parse-tasks 分析指令"

curl -s -X POST http://localhost:8000/parse-tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"instruction": "请分析客户反馈"}' | jq

# ✅ 6. 调用 /run-agents 任务执行接口
echo "🤖 执行 run-agents 多智能体分析"

curl -s -X POST http://localhost:8000/run-agents \
  -H "Authorization: Bearer $TOKEN" \
  -F "instruction=请分析客户反馈和社交情绪" \
  -F "file=@test.csv"

# ✅ 7. chat/ask 第一轮
echo "💬 聊天指令 1：请分析客户反馈"

RESP1=$(curl -s -X POST http://localhost:8000/chat/ask \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"instruction": "请分析客户反馈"}')
echo "$RESP1" | jq

# ✅ 8. chat/ask 第二轮
echo "💬 聊天指令 2：再加上社交媒体舆情分析"

RESP2=$(curl -s -X POST http://localhost:8000/chat/ask \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"instruction": "再加上社交媒体舆情分析"}')
echo "$RESP2" | jq

# # ✅ 9. 静态报告访问测试
# echo "📁 模拟下载测试报告文件（如存在）"
# curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/static/reports/report.docx

# ✅ 10. 清理
rm test.csv
echo "✅ 测试流程结束"