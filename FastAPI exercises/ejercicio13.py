from fastapi import FastAPI
from fastapi import Header
from fastapi import HTTPException
from fastapi import Depends

app = FastAPI()

X_API_KEY = "09082005"

def validar_api_key(x_api_key:str=Header(None)):
    if x_api_key is None:
        raise HTTPException(status_code=401, detail="Falta X-API-Key")
    if x_api_key != X_API_KEY:
        raise HTTPException(status_code=403, detail="Clave inválida")

app = FastAPI(dependencies=[Depends(validar_api_key)])

@app.get("/prueba/")
def leer_prueba():
    return {"ok": True}