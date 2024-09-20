// Função para adicionar um item ao DOM
function addItemToDOM(position, text) {
    const todoList = document.getElementById('todo-list');

    // Criar um novo elemento de item
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // Criar o checkbox com o atributo data-position
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.position = position; // Define a posição no atributo data-position

    // Adicionar um listener de evento change ao checkbox
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            console.log('Checkbox selecionado com ID:', this.dataset.position);
        }
    });

    // Criar um label com o texto da tarefa
    const label = document.createElement('label');
    label.textContent = text;

    // Criar botão de edição (se necessário)
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = '✎'; // Ícone de lápis para editar
    editButton.onclick = () => updateItem(position, prompt('Editar tarefa:', text)); // Chamar updateItem ao clicar

    // Adicionar checkbox, label e botão de edição ao item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(editButton);

    // Adicionar o item à lista
    todoList.appendChild(todoItem);
}


// Função para adicionar um novo item através do input
function addItem() {
    const itemText = document.getElementById('new-item-text').value;
    if (itemText.trim() === '') {
        alert('Por favor, insira um texto para o novo item.');
        return;
    }

    // Chamar a API para salvar o item
    fetch(`http://127.0.0.1:8000/addItem?tarefa=${encodeURIComponent(itemText)}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);

        // Adicionar o item à lista DOM após confirmação da API
        const position = data.position; // Supondo que a API retorne uma posição/ID
        addItemToDOM(position, itemText);

        // Limpar o campo de entrada
        document.getElementById('new-item-text').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao adicionar o item. Tente novamente.');
    });
}

// Função para remover itens selecionados
function removeSelectedItems() {
    const todoList = document.getElementById('todo-list');

    console.log(todoList);
    console.log("Passou aqui")

    // Obter todos os checkboxes marcados
    const selectedItems = [...todoList.querySelectorAll('input[type="checkbox"]:checked')];

    if (selectedItems.length === 0) {
        alert('Nenhum item selecionado.');
        return;
    }

    console.log(selectedItems.length);

    // Processar cada item selecionado
    const promises = selectedItems.map(item => {
        // Obter a posição ou ID da tarefa do atributo data-position
        console.log(item);
        console.log(item.dataset);
        console.log(item.dataset.position);
        const position = item.dataset.position;
        console.log(position);

        return fetch(`http://127.0.0.1:8000/removeItem?posicao=${position}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Erro desconhecido na API');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(`Item removido com sucesso: posição ${position}`, data);

            // Remover visualmente o item do front-end
            const todoItem = item.closest('.todo-item');
            if (todoItem) {
                todoItem.remove();
            }
        })
        .catch(error => {
            console.error(`Erro ao remover item na posição ${position}:`, error.message);
            alert(`Erro ao remover item na posição ${position}: ${error.message}`);
        });
    });

    // Executar todas as promessas de remoção
    Promise.all(promises)
        .then(() => {
            console.log('Todos os itens selecionados foram processados.');
        })
        .catch(error => {
            console.error('Erro ao processar remoção de itens:', error.message);
        });
}

// Função para remover todos os itens
function removeAllItems() {
    // Chamar a API para remover todos os itens
    fetch('http://127.0.0.1:8000/removeAll', {
        method: 'DELETE',  
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'removeAll' })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);

        // Limpar a lista de tarefas no frontend
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao remover os itens. Tente novamente.');
    });
}

// Função para atualizar um item
function updateItem(position, tarefa) {
    if (tarefa === null) return; // Se o usuário cancelar a edição
    const apiUrl = `http://127.0.0.1:8000/updateItem?posicao=${position}&tarefa=${encodeURIComponent(tarefa)}`;

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Erro desconhecido na API');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Item atualizado com sucesso:', data);

        // Atualizar o texto do item no DOM
        const todoItem = document.querySelector(`input[data-position="${position}"]`).nextElementSibling;
        if (todoItem) {
            todoItem.textContent = tarefa;
        }
    })
    .catch(error => {
        console.error('Erro:', error.message);
        alert(`Erro ao atualizar item: ${error.message}`);
    });
}

// Ao carregar a página, adicionar os itens existentes
window.onload = function() {
    // Supondo que você receba os itens do backend na forma de um objeto JSON
    const todos = {
        "2": "tarefa 2",
        "3": "tarefa 3"
    };

    // Iterar sobre o objeto para adicionar os itens ao DOM
    for (let position in todos) {
        addItemToDOM(position, todos[position]);
    }
};
