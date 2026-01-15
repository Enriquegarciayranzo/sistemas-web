from fastapi import FastAPI
from fastapi import Query

app = FastAPI()
@app.get("/buscar/")
async def buscar(q:str=Query(None, min_length=3)):
    return {"resultado":q}