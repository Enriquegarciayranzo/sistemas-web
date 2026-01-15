from fastapi import FastAPI 
from fastapi import HTTPException
from pydantic import BaseModel
from typing import Dict
from typing import Optional

app = FastAPI()

class HeroBase(BaseModel):
    name:str
    age:int
    secret_name:Optional[str]=None

class HeroCreate(HeroBase):
    pass

class Hero(HeroBase):
    id:int

fake_hero_db: Dict[int, Hero] = {}
next_id=1

@app.post("/heroes/", response_model=Hero)
def create_hero(hero:HeroCreate):
    global next_id
    new_hero=Hero(id=next_id, **hero.model_dump())
    fake_hero_db[next_id]=new_hero
    next_id+=1
    return new_hero

@app.get("/heroes/{hero_id}", response_model=Hero)
def read_hero(hero_id: int):
    hero=fake_hero_db.get(hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero

@app.get("/heroes/", response_model=list[Hero])
def list_heroes():
    return list(fake_hero_db.values())

@app.put("/heroes/{hero_id}", response_model=Hero)
def update_hero(hero_id: int, hero_update: HeroCreate):
    if hero_id not in fake_hero_db:
        raise HTTPException(status_code=404, detail="Hero not found")

    updated=Hero(id=hero_id, **hero_update.model_dump())
    fake_hero_db[hero_id]=updated
    return updated

@app.delete("/heroes/{hero_id}")
def delete_hero(hero_id:int):
    if hero_id not in fake_hero_db:
        raise HTTPException(status_code=404, detail="Hero not found")

    del fake_hero_db[hero_id]
    return {"deleted": True, "id": hero_id}