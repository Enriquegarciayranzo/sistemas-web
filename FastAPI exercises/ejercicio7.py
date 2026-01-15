from fastapi import FastAPI
from fastapi import Depends
from pydantic import BaseModel

app = FastAPI()
class Filtros(BaseModel):
    q:str | None
    limit:int=10
    tags:list[str]=[]

@app.get("/catalog")
def leer_catalogo(filtros: Filtros = Depends()):
    items = [
        {"id": 1, "nombre": "Quique"},
        {"id": 2, "nombre": "Javier"},
        {"id": 3, "nombre": "Carlos"},
    ]
    return {
        "items": items[:filtros.limit],
        "filtros": filtros
    }