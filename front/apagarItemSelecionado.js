function removeSelectedItems() {
    const todoList = document.getElementById('todo-list');

    // Obter todos os checkboxes marcados
    const selectedItems = [...todoList.querySelectorAll('input[type="checkbox"]:checked')];

    if (selectedItems.length === 0) {
        alert('Nenhum item selecionado.');
        return;
    }

    // Processar cada item selecionado
    const promises = selectedItems.map(item => {
        // Obter a posição ou ID da tarefa do atributo data-position
        const position = item.dataset.position; // Posição ou ID da tarefa no back-end

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