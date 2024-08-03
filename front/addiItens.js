function addItem() {
    const itemText = document.getElementById('new-item-text').value;
    if (itemText === "") {
        alert("Please enter an item text.");
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
        
        // Adicionar o item à lista apenas após a confirmação da API
        const todoList = document.getElementById('todo-list');

        // Criar um novo div para o item da lista
        const newItemDiv = document.createElement('div');
        newItemDiv.classList.add('todo-item');

        // Criar a nova checkbox
        const newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.name = 'subscribe';
        newCheckbox.onclick = function() { toggleCheck(newCheckbox); };

        // Criar o novo label
        const newLabel = document.createElement('label');
        newLabel.textContent = itemText;

        // Adicionar a checkbox e o label ao novo div
        newItemDiv.appendChild(newCheckbox);
        newItemDiv.appendChild(newLabel);

        // Adicionar o novo div à lista de tarefas
        todoList.appendChild(newItemDiv);

        // Limpar o campo de entrada
        document.getElementById('new-item-text').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error adding the item. Please try again.');
    });
}