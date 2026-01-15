from fastapi import FastAPI
from fastapi import Path

app = FastAPI()
@app.get("/paginas/{n}")
async def leer_pagina(numero:int=Path(ge=1, le=100)):
    return {"page":numero}