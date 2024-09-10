function updateItem(position, tarefa) {
    const apiUrl = `http://127.0.0.1:8000/updateItem?posicao=${position}&tarefa=${encodeURIComponent(tarefa)}`;  // URL da API com parâmetros dinâmicos

    fetch(apiUrl, {
        method: 'PUT',  // Método HTTP para atualização
        headers: {
            'Content-Type': 'application/json'  // Cabeçalho para JSON
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
        console.log('Item updated successfully:', data);

        const todoList = document.getElementById('todo-list');
        const listItem = document.querySelector(`#item-${position}`);  
        if (listItem) {
            listItem.textContent = tarefa;  
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(`Erro ao atualizar item: ${error.message}`);
    });
}

// Exemplo de uso:
// updateItem(1, 'teste50');
