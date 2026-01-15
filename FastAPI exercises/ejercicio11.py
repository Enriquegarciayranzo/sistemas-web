from fastapi import FastAPI
from fastapi import Header
from fastapi import HTTPException
from fastapi import Depends

app = FastAPI()

def get_current_user(x_user:str=Header(None)):
    if x_user is None:
        raise HTTPException(status_code=401, detail="X-User header missing")
    return {"usuario":x_user}

@app.get("/me/")
async def leer_usuario(current_user=Depends(get_current_user)):
    return current_user