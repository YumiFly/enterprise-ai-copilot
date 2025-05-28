# app/db/database.py 示例
from sqlalchemy.orm import Session
from .session import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()