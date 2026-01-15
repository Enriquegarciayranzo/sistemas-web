from fastapi import FastAPI
from fastapi import UploadFile, File, Form

app = FastAPI()
@app.post("/upload/")
async def subir_archivo(
    descripcion:str=Form(...),
    file:UploadFile=File(...)):
    return {
        "filename":file.filename,
        "content_type":file.content_type,
        "description":descripcion,
    }