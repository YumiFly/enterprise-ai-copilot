#!/bin/bash

cd "$(dirname "$0")"

export PYTHONPATH=.

echo "🚀 正在运行 Pytest 单元测试..."
pytest -v tests/test_main.py -p no:warnings