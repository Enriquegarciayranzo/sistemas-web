from fastapi import FastAPI
from fastapi import HTTPException
from sqlmodel import SQLModel
from sqlmodel import Field
from sqlmodel import Session
from sqlmodel import create_engine
from sqlmodel import select
from typing import Optional
from typing import List
from contextlib import asynccontextmanager

DATABASE_URL="sqlite:///app.db"
engine=create_engine(DATABASE_URL, echo=False)

class User(SQLModel, table=True):
    id:Optional[int]=Field(default=None, primary_key=True)
    email:str=Field(index=True, unique=True)
    full_name:Optional[str]=None

class UserCreate(SQLModel):
    email:str
    full_name:Optional[str]=None

class UserRead(SQLModel):
    id:int
    email:str
    full_name:Optional[str]=None

class UserUpdate(SQLModel):
    email:Optional[str]=None
    full_name:Optional[str]=None

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app:FastAPI):
    create_db_and_tables()
    yield

app=FastAPI(lifespan=lifespan)

@app.post("/users/", response_model=UserRead)
def create_user(user:UserCreate):
    with Session(engine) as session:
        statement=select(User).where(User.email==user.email)
        if session.exec(statement).first():
            raise HTTPException(status_code=400, detail="Email already exists")

        new_user=User(email=user.email, full_name=user.full_name)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return new_user

@app.get("/users/{user_id}", response_model=UserRead)
def read_user(user_id:int):
    with Session(engine) as session:
        user=session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

@app.get("/users/", response_model=List[UserRead])
def list_users(skip:int=0, limit:int=10):
    with Session(engine) as session:
        users=session.exec(select(User).offset(skip).limit(limit)).all()
        return users

@app.put("/users/{user_id}", response_model=UserRead)
def update_user(user_id:int, user_update:UserUpdate):
    with Session(engine) as session:
        user=session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user_update.email and user_update.email!=user.email:
            statement=select(User).where(User.email==user_update.email)
            if session.exec(statement).first():
                raise HTTPException(status_code=400, detail="Email already exists")

        update_data=user_update.model_dump(exclude_unset=True)
        for k, v in update_data.items():
            setattr(user, k, v)

        session.add(user)
        session.commit()
        session.refresh(user)
        return user

@app.delete("/users/{user_id}")
def delete_user(user_id:int):
    with Session(engine) as session:
        user=session.get(User, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        session.delete(user)
        session.commit()
        return {"deleted": True, "id": user_id}  