# app/db/models.py

from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship, Session
from .session import Base, engine

def init_db():
    Base.metadata.create_all(bind=engine)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class TaskHistory(Base):
    __tablename__ = "task_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    instruction = Column(Text)
    tasks = Column(Text)

class UserSession(Base):
    __tablename__ = "user_sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    chat_context = Column(Text)

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()