function removeAllItems() {
    // Chamar a API para remover todos os itens
    fetch('http://127.0.0.1:8000/removeAll', {
        method: 'DELETE',  // Alterado para POST
        headers: {
            'Content-Type': 'application/json'  // Adicionando cabeçalho apropriado
        },
        body: JSON.stringify({ action: 'removeAll' })  // Enviar um corpo com uma ação específica
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
        alert('There was an error removing the items. Please try again.');
    });
}
