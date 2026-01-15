from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
from pydantic import EmailStr
from typing import Optional
from typing import Dict

app = FastAPI()

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

class UserUpdate(UserBase):
    pass

class UserPatch(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None

fake_db: Dict[int, User] = {}
next_id = 1

@app.post("/users/", response_model=User)
def create_user(user: UserCreate):
    global next_id
    new_user = User(id=next_id, **user.model_dump())
    fake_db[next_id] = new_user
    next_id += 1
    return new_user

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int):
    user = fake_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{user_id}", response_model=User)
def replace_user(user_id: int, user_update: UserUpdate):
    if user_id not in fake_db:
        raise HTTPException(status_code=404, detail="User not found")
    updated = User(id=user_id, **user_update.model_dump())
    fake_db[user_id] = updated
    return updated

@app.patch("/users/{user_id}", response_model=User)
def patch_user(user_id: int, user_patch: UserPatch):
    stored = fake_db.get(user_id)
    if not stored:
        raise HTTPException(status_code=404, detail="User not found")

    stored_data = stored.model_dump()
    update_data = user_patch.model_dump(exclude_unset=True)

    for k, v in update_data.items():
        stored_data[k] = v

    updated = User(**stored_data)
    fake_db[user_id] = updated
    return updated