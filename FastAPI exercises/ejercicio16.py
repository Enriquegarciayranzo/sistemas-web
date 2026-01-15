from fastapi import FastAPI
import time

app = FastAPI()

@app.middleware("http")
async def medir_tiempo(request, call_next):
    inicio=time.time()
    response=await call_next(request)
    fin=time.time()
    duracion=fin-inicio
    response.headers["X-Process-Time"]=str(duracion)
    return response

@app.get("/ruta/")
def leer_root():
    return {"ok": True}