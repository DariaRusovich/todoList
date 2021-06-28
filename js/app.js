if (!localStorage.todos) {
    localStorage.todos = JSON.stringify([{
        id: 1,
        title: 'Todo title1',
        text: 'Todo text1',
        createdAt: Date.now() - 20000,
        updatedAt: null,
        status: 'new'
    }, {
        id: 2,
        title: 'Todo title2',
        text: 'Todo text2',
        createdAt: Date.now() - 15000,
        updatedAt: null,
        status: 'new'
    }, {
        id: 3,
        title: 'Todo title3',
        text: 'Todo text3',
        createdAt: Date.now() - 10000,
        updatedAt: Date.now(),
        status: 'process'
    }, {
        id: 4,
        title: 'Todo title4',
        text: 'Todo text4',
        createdAt: Date.now() - 5000,
        updatedAt: Date.now(),
        status: 'done'
    }])
}
// const todo = {
//     id: 1,
//     title: 'Todo title',
//     text: 'Todo text',
//     createdAt: 16465465456,
//     doneAt: null,
//     done: false
// }

const todoListEl = document.getElementById('todoList')
const addTodoFormEl = document.getElementById('addTodoForm')
const titleTodo = document.getElementById('titleTodo')
const todos = JSON.parse(localStorage.todos)
console.log(todos);
renderTodoList(todoListEl, todos)


addTodoFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const titleValue = titleTodo.value


    //console.log(titleValue);
})

todoListEl.addEventListener('click', e => {
    const nextBtn = e.target.closest('.btn-next')
    const removeBtn = e.target.closest('.btn-remove')
    const currentTodoEl = e.target.closest('.todo')
    if (currentTodoEl) {
        const currentTodoId = currentTodoEl.dataset.id
        if (nextBtn) {
            const currentTodo = todos.find(todo => todo.id === +currentTodoId)
            const currentStatus = currentTodo.status
            currentTodo.status = getNewStatus(currentStatus)
        }
        if (removeBtn) {
            const currentTodoIdx = todos.findIndex(todo => todo.id === +currentTodoId)
            todos.splice(currentTodoIdx, 1)
        }
        renderTodoList(todoListEl, todos)
        localStorage.todos = JSON.stringify(todos)
    }
})

function getNewStatus(currentStatus) {
    switch (currentStatus) {
        case 'new':
            return 'process'
        case 'process':
            return 'done'
        default:
            throw new Error(`Wrong current status ->> "${currentStatus}"`)
    }
}

function renderTodoList(todoListEl, todos) {
    todoListEl.innerHTML = createTodoListHTML(todos).join('')
}

function createTodoListHTML(todos) {
    return todos.map(todo => createTodoHTML(todo))
}

function createTodoHTML(todo) {
    return `<div class="card todo ${todo.status} mb-3" data-id="${todo.id}">
    <!-- <div class="card-header">Featured</div> -->
    <div class="card-body">
      <h5 class="card-title">${todo.title}</h5>
      <p class="card-text">${todo.text}</p>
      ${todo.status !== 'done' ? `<button class="btn btn-primary btn-next">Change status to "${getNewStatus(todo.status)}"</button>` : '<button class="btn btn-danger btn-remove"><i class="bi bi-trash-fill"></i></button>'}
    </div>
    <div class="card-footer d-flex justify-content-between">
        <small><i class="bi bi-file-earmark-plus-fill"></i> ${todo.createdAt}</small>
        ${todo.updatedAt ? `<small><i class="bi bi-check-circle-fill"></i> ${todo.updatedAt}</small>` : ''}
    </div>
  </div>`
}




[{
    id: 1,
    title: 'Todo title1',
    text: 'Todo text1',
    createdAt: Date.now() - 20000,
    updatedAt: null,
    status: 'new'
}, {
    id: 2,
    title: 'Todo title2',
    text: 'Todo text2',
    createdAt: Date.now() - 15000,
    updatedAt: null,
    status: 'new'
}, {
    id: 3,
    title: 'Todo title3',
    text: 'Todo text3',
    createdAt: Date.now() - 10000,
    updatedAt: Date.now(),
    status: 'process'
}, {
    id: 4,
    title: 'Todo title4',
    text: 'Todo text4',
    createdAt: Date.now() - 5000,
    updatedAt: Date.now(),
    status: 'done'
}]