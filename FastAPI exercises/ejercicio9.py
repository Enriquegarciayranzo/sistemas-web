from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
class Producto_Trabajadores(BaseModel):
    id:int
    nombre:str
    precio_coste:float
    precio_venta:float

class Producto_Publico(BaseModel):
    id:int
    nombre:str
    precio_venta:float

@app.post("/producto/", response_model=Producto_Publico)
def crear_producto(Producto:Producto_Trabajadores):
    return Producto