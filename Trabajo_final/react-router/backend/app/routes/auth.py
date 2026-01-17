from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.dependencies import SessionDep
from app.models.user import User, UserCreate, UserPublic
from app.auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserPublic)
def register(data: UserCreate, session: SessionDep):
    existing = session.exec(select(User).where(User.email == data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(email=data.email, hashed_password=hash_password(data.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/login")
def login(data: UserCreate, session: SessionDep):
    user = session.exec(select(User).where(User.email == data.email)).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Bad credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}