from fastapi import FastAPI

app = FastAPI()
@app.get("/item/{numero}")
def leer_item(numero:int):
    return {"item_id":numero}