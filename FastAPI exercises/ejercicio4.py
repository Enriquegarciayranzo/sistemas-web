from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class Usuario(BaseModel):
    nombre:str
    edad:int

@app.post("/usuarios/")
async def crear_usuario(usuario:Usuario):
    return usuario