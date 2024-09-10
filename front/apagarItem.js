function removeAllItems() {
    const apiUrl = 'http://127.0.0.1:8000/removeItem';  // URL da API
    const position = 1;  // Variável para a posição do item

    fetch(`${apiUrl}?posicao=${position}`, {
        method: 'DELETE',  // Correto método DELETE
        headers: {
            'Content-Type': 'application/json'  // Cabeçalho para JSON
        },
        body: JSON.stringify({ action: 'removeItem' })  // Corpo da requisição
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
        console.log('Items removed successfully:', data);

        // Limpar a lista de tarefas no frontend
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';  // Limpa visualmente a lista
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(`Erro ao remover itens: ${error.message}`);
    });
}
