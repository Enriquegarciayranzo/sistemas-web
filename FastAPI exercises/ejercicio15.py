from fastapi import FastAPI
from fastapi import BackgroundTasks

app = FastAPI()

def solicitud(mensaje: str):
    with open("log.txt", "a") as f:
        f.write(mensaje + "\n")

@app.post("/notify/ ")
def notificar(background_tasks: BackgroundTasks):
    background_tasks.add_task(solicitud, "notificacion recibida")
    return {"ok": True}