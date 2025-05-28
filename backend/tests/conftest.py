# tests/conftest.py
import pytest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../app")))
from db.models import init_db
from dotenv import load_dotenv
load_dotenv(".env")

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    print("⚙️ 初始化数据库...")
    init_db()


# @pytest.fixture(autouse=True)
# def mock_gemini():
#     with patch("utils.llm_parser.parse_instruction_with_gemini") as mock:
#         mock.return_value = ["analyze_customer_feedback"]
#         yield mock