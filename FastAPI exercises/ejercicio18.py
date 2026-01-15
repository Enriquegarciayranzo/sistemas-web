from fastapi import FastAPI
from fastapi import Response
from fastapi import Cookie

app = FastAPI()

@app.post("/login/")
def login(response:Response):
    response.set_cookie(key="session_id", value="12345")
    response.headers["X-Logged-In"]="true"
    return {"ok": True}

@app.get("/me/")
def me(session_id:str=Cookie(None)):
    if session_id is None:
        return {"logged_in":False}
    return {"logged_in": True, "session_id":session_id}