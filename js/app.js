if (!localStorage.todos) {
    localStorage.todos = JSON.stringify([])
}


const todoListsEl = document.getElementById('todoLists')

const addTodoFormEl = document.getElementById('addTodoForm')
const todos = JSON.parse(localStorage.todos)
console.log(todos);
renderTodoList(todoListsEl, todos)


addTodoFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const titleValue = e.target.title.value
    const textValue = e.target.text.value
    const todoIds = todos.map(todo => todo.id)
    const maxId = Math.max(...todoIds)
    const newTodo = {
        id: maxId < 0 ? 1 : maxId + 1,
        title: titleValue,
        text: textValue,
        createdAt: Date.now(),
        updatedAt: null,
        status: 1
    }
    todos.push(newTodo)
    renderTodoList(todoListsEl, todos)
    localStorage.todos = JSON.stringify(todos)
    console.log(todos);
    e.target.reset()
})


todoListsEl.addEventListener('click', e => {
    const nextBtn = e.target.closest('.btn-next')
    const removeBtn = e.target.closest('.btn-remove')
    const currentTodoEl = e.target.closest('.todo')
    if (currentTodoEl) {
        const currentTodoId = currentTodoEl.dataset.id
        if (nextBtn) {
            const currentTodo = todos.find(todo => todo.id === +currentTodoId)
            currentTodo.status++
            currentTodo.updatedAt = Date.now()
        }
        if (removeBtn) {
            const currentTodoIdx = todos.findIndex(todo => todo.id === +currentTodoId)
            todos.splice(currentTodoIdx, 1)
        }
        renderTodoList(todoListsEl, todos)
        localStorage.todos = JSON.stringify(todos)
    }
})

function getStatusFromCode(status) {
    switch (status) {
        case 1:
            return 'new'
        case 2:
            return 'process'
        case 3:
            return 'done'
        default:
            throw new Error('Wrong status code');
    }
}

function renderTodoList(todoListEl, todos) {
    todos.sort((a, b) => a.status - b.status || b.updatedAt - a.updatedAt || b.createdAt - a.createdAt)
    Array.from(todoListEl.children).forEach(todoList => {
        todoList.innerHTML = createTodoListHTML(todos.filter(todo => +todoList.dataset.status === todo.status)).join('')
    })
}

function createTodoListHTML(todos) {
    return todos.map(todo => createTodoHTML(todo))
}

function createTodoHTML(todo) {
    return `<div class="card todo ${getStatusFromCode(todo.status)} mb-3" data-id="${todo.id}">
    <!-- <div class="card-header">Featured</div> -->
    <div class="card-body">
      <h5 class="card-title">${todo.title}</h5>
      <p class="card-text">${todo.text}</p>
      ${todo.status !== 3 ? `<button class="btn btn-primary btn-next">Change status to "${getStatusFromCode(todo.status + 1)}"</button>` : '<button class="btn btn-danger btn-remove"><i class="bi bi-trash-fill"></i></button>'}
    </div>
    <div class="card-footer d-flex justify-content-between">
        <small><i class="bi bi-file-earmark-plus-fill"></i> ${todo.createdAt}</small>
        ${todo.updatedAt ? `<small><i class="bi bi-check-circle-fill"></i> ${todo.updatedAt}</small>` : ''}
    </div>
  </div>`
}



// function asyncFuncWithCb(final, resolve, reject) {
//     setTimeout(() => {
//         const data = Math.random()
//         final()
//         if (data > 0.5) {
//             resolve(data)
//         } else {
//             reject(data)
//         }
//     }, 1000);
// }

// asyncFuncWithCb(
//     () => console.log('Finished!'),
//     result => console.log('Good!', result),
//     error => console.log('Bad!', error)
// )


// const promise = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         const data = Math.random()
//         if (data > 0.5) {
//             resolve(data)
//         } else {
//             reject(data)
//         }
//     }, 1000);
// })

// promise
//     .finally(() => console.log('Finished!'))
//     .then(result => console.log('Good!', result))
//     .catch(error => console.log('Bad!', error))





const chaining_promise = new Promise(function (res, rej) {
    setTimeout(() => {
        const data = 1
        if (data > 0.5) {
            res(data)
        } else {
            rej(data)
        }
    }, 0);
})

chaining_promise
    .finally(() => console.log('finally!'))
    .then(result => {
        console.log('then!', result)
        return result + 1 
    })
    .then(result => {
        console.log('then!', result)
        return result + 1 
    })
    .then(result => {
        console.log('then!', result)
        return Promise.reject('Fuck!')
    })
    .catch(error => {
        console.log('catch!', error)
        return error
    })