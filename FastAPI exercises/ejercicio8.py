from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class Usuario(BaseModel):
    nombre:str
    edad:int

    model_config = {
        "json_schema_extra":{
            "example":{"nombre":"Enrique", "edad":20}
        }
    }

@app.post("/usuario/")
async def crear_usuario(usuario: Usuario):
    return usuario