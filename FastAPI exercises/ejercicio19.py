from fastapi import FastAPI
from fastapi import Response
from fastapi import Cookie
from fastapi import HTTPException
from fastapi import Depends

app = FastAPI()

@app.post("/login/")
def login(response:Response):
    response.set_cookie(key="session_id", value="12345")
    response.headers["X-Logged-In"] = "true"
    return {"ok": True}

@app.get("/me/")
def me(session_id:str=Cookie(None)):
    if session_id is None:
        return {"logged_in": False}
    return {"logged_in": True, "session_id": session_id}

def require_login(session_id:str=Cookie(None)):
    if session_id is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return session_id

@app.get("/protected/")
def protected(session_id:str=Depends(require_login)):
    return {"secret": "42"}

@app.get("/items/{item_id}")
def read_item(item_id:int):
    return {"item_id": item_id}