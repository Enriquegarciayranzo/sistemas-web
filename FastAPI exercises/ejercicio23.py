from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/users/")
def list_users():
    return [
        {"id": 1, "name": "Enrique Garcia"},
        {"id": 2, "name": "Javier Gallardo"},
        {"id": 3, "name": "Carlos Vicente"},
    ]

app.mount("/static/", StaticFiles(directory="static"), name="static")