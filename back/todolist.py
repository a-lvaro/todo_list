class TodoList:
    def __init__(self):
        self.todo = {}

    def add(self, tarefa :str):
        self.todo[len(self.todo) + 1] = tarefa
        return self.todo

    def remove(self, posicao :int) -> list|str:
        tamanho_lista = len(self.todo)
        if posicao > tamanho_lista or posicao <= 0:
            return "Posição inválida"
        
        self.todo.pop(posicao)
        return self.todo

    def getAll(self) -> dict:
        return self.todo
    
    def update(self, posicao :int, tarefa :str):
        tamanho_lista = len(self.todo)
        if posicao > tamanho_lista or posicao <= 0:
            return "Posição inválida"
        
        self.todo[posicao] = tarefa
        return self.todo
    
    def removeAll(self):
        self.todo.clear()
        return self.todo
