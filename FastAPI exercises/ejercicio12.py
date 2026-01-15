from fastapi import FastAPI
from fastapi import Depends

app = FastAPI()

def resource():
    print("open")
    try: 
        yield {"conexion":"falsa"}
    finally:
        print("close")

@app.get("/a/")
def read_a(resource=Depends(resource)):
    print("Recurso a")
    return "a"

@app.get("/b/")
def read_b(resource=Depends(resource)):
    print("Recurso b")
    return "b"