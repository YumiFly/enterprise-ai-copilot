from db.models import UserSession

def save_user_context(db, user_id: int, context: str):
    session = db.query(UserSession).filter(UserSession.user_id == user_id).first()
    if session:
        session.chat_context = context
    else:
        session = UserSession(user_id=user_id, chat_context=context)
        db.add(session)
    db.commit()

def get_user_context(db, user_id: int):
    session = db.query(UserSession).filter(UserSession.user_id == user_id).first()
    return session.chat_context if session else ""