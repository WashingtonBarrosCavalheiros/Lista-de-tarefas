var add = document.getElementById('addToDo');
var input = document.getElementById('inputField');
var toDoContainer = document.getElementById('toDoContainer');
var searchField = document.getElementById('searchField'); // campo de busca

add.addEventListener('click', addItem);
input.addEventListener('keypress', function(e) {
    if (e.key == "Enter") {
        addItem();
    }
});

// função para adicionar item
function addItem() {
    const item_value = input.value.trim();
    if (item_value === "") return; // impede adicionar item vazio

    const item = document.createElement('div');
    item.classList.add('item', 'p-2', 'border', 'mb-2'); // adicionei as classes de espaçamento

    const item_content = document.createElement('div');
    item_content.classList.add('content');
    item.appendChild(item_content);

    const input_item = document.createElement('input');
    input_item.classList.add('text');
    input_item.type = 'text';
    input_item.value = item_value;
    input_item.setAttribute('readonly', 'readonly');
    input_item.addEventListener('dblclick', function() {
        input_item.style.textDecoration = "line-through";
    });
    item_content.appendChild(input_item);

    const item_action = document.createElement('div');
    item_action.classList.add('actions');

    const edit_item = document.createElement('button');
    edit_item.classList.add('edit', 'btn', 'btn-success', 'me-2');
    edit_item.type = "button";
    edit_item.innerText = 'Edit';

    const delete_item = document.createElement('button');
    delete_item.classList.add('delete', 'btn', 'btn-danger');
    delete_item.innerHTML = '<i class="fa fa-trash"></i>'; // ícone dentro do botão

    item_action.appendChild(edit_item);
    item_action.appendChild(delete_item);

    item.appendChild(item_action);

    toDoContainer.appendChild(item);

    input.value = '';

    // Evento para editar
    edit_item.addEventListener('click', (e) => {
        if (edit_item.innerText.toLowerCase() == "edit") {
            edit_item.innerText = "Save";
            input_item.removeAttribute("readonly");
            input_item.focus();
        } else {
            edit_item.innerText = "Edit";
            input_item.setAttribute("readonly", "readonly");
        }
    });

    // Evento para deletar
    delete_item.addEventListener('click', (e) => {
        toDoContainer.removeChild(item);
    });
}

// função de pesquisa ao digitar
searchField.addEventListener('input', function() {
    const searchTerm = searchField.value.toLowerCase();
    const tasks = toDoContainer.getElementsByClassName('item');

    Array.from(tasks).forEach(function(task) {
        const inputText = task.querySelector('.text').value.toLowerCase();
        if (inputText.includes(searchTerm)) {
            task.style.display = "flex"; // mostra se combinar
        } else {
            task.style.display = "none"; // esconde se não combinar
        }
    });
});
