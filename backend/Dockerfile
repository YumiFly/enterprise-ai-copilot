FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 拷贝项目文件
#COPY . /app

# 安装系统依赖（包含 SQLite、编译工具、matplotlib 图形依赖等）
RUN apt-get update && apt-get install -y \
    build-essential \
    libsqlite3-dev \
    sqlite3 \
    curl \
    git \
    gcc \
    pkg-config \
    libfreetype6-dev \
    libpng-dev \
    libopenblas-dev \
    && rm -rf /var/lib/apt/lists/*

# 安装 Python 依赖
RUN pip install --no-cache-dir --upgrade pip

# 暴露端口
EXPOSE 8000

# 启动 FastAPI 服务
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]