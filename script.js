const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");

let todos = [];

todoInput.addEventListener("keyup", function(e){
    if (e.key === "Enter" || e.keyCode === 13){
        todos.push({ value: e.target.value, checked: false});
        newTodo(e.target.value);
        todoInput.value = "";
        countComplted();
    }
});

function newTodo(value) {
    const todo = document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckBox = document.createElement("input");
    const todoCheckBoxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    let obj = todos.find((t) => t.value === value);


    todoText.textContent = value;
    todoCheckBox.type = "checkbox";
    todoCheckBox.name = "checkbox";
    todoCheckBoxLabel.htmlFor = "checkbox";
    todoCheckBoxLabel.addEventListener("click", function (e){
        if (todoCheckBox.checked){
            todoCheckBox.checked = false;
            todoText.style.textDecoration = "none";
            todoText.style.color= "var(--tgl-txt-active)";
            todoCheckBoxLabel.classList.remove("active");
            obj.checked = false;
            countComplted();
        } else {
            obj.checked = true;
            countComplted();
            todoCheckBox.checked = true;
            todoText.style.textDecoration = "line-through";
            todoText.style.color= "var(--tgl-txt-check)";
            todoCheckBoxLabel.classList.add("active");
        }
    });

    todoCross.textContent = "X";
    todoCross.addEventListener("click", function(e){
        e.target.parentElement.remove();
        todos = todos.filter((t) => t !== obj);
        countComplted();
    });

    todo.classList.add("todo");
    todoCheckBoxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckBox);
    todo.appendChild(todoCheckBoxLabel);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);
    
    todosContainer.appendChild(todo);
}

function countComplted(){
    completedCount.textContent = `${
        todos.filter((t) => t.checked === false).length
    } items left`;
}

function changeTheme(){
    document.body.classList.toggle("light");
}

function clearCompleted(){
    document.querySelectorAll(".todo").forEach((todo) => {
        if (todo.querySelector("input").checked){
            todo.remove();
        }
    })
}

function showAll(){
    document.querySelectorAll(".filter")
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
    })
}

function filterCompleted(){
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (!todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    })
}

function filterActive(){
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.style.display = "grid";
        if (todo.querySelector("input").checked) {
            todo.style.display = "none";
        }
    })
}
