from fastapi import FastAPI

from todolist import TodoList

app = FastAPI()

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

@app.post("/addItem")
async def addItem(tarefa :str):
    lista = todo_list.add(tarefa)
    return {"mensagem": lista}

@app.put("/updateItem")
async def updateItem(posicao :int, tarefa :str):
    lista = todo_list.update(posicao, tarefa)
    return {"message": lista}