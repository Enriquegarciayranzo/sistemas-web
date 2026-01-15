from fastapi import FastAPI

app = FastAPI()
numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

@app.get("/numeros/")
async def leer_items(skip:int=0, limit:int=10):
    return numeros