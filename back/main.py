from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from todolist import TodoList

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  poetry run uvicorn main:app --reload

todo_list = TodoList()


class Tarefa:
    tarefa :str
    data: str

@app.get("/lista")
async def lista():
    return {"message": todo_list.getAll()}

@app.delete("/removeItem")
async def removeItem(posicao :int):
    lista = todo_list.remove(posicao)
    return {"mensagem": lista}

@app.delete("/removeAll")
async def removeAll():
    lista = todo_list.removeAll()
    return {"mensagem": lista}

@app.post("/addItem")
async def addItem(tarefa :str):
    lista = todo_list.add(tarefa)
    return {"mensagem": lista}

@app.put("/updateItem")
async def updateItem(posicao :int, tarefa :str):
    lista = todo_list.update(posicao, tarefa)
    return {"message": lista}