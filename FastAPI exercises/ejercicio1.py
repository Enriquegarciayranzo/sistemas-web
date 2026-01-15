from fastapi import FastAPI

app = FastAPI()
@app.get("/mensaje/")
def leer_mensaje():
    return {"message":"hello"}