from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
from jose import jwt

app = FastAPI()

CLAVE = "EnriqueGarcia"
ALGORITMO = "HS256"

class Login(BaseModel):
    username: str
    password: str

def crear_token(usuario: str):
    return jwt.encode({"user": usuario}, CLAVE, algorithm=ALGORITMO)

@app.post("/token/")
def login(data: Login):
    if data.username != "user" or data.password != "pass":
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"token": crear_token(data.username), "token_type": "bearer"}