const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");
const themeToggle = document.querySelector("#theme-toggle");
const clearButton = document.querySelector("#clear-completed");
const filterAllButton = document.querySelector("#filter-all");
const filterActiveButton = document.querySelector("#filter-active");
const filterCompletedButton = document.querySelector("#filter-completed");

let todos = [];

todoInput.addEventListener("keyup", function(e){
    if (e.key === "Enter" && e.target.value.trim() !== ""){
        const todo = { id: Date.now(), value: e.target.value.trim(), checked: false };
        todos.push(todo);
        newTodo(todo);
        todoInput.value = "";
        countCompleted();
    }
});

function newTodo(todoObj) {
    const todoEl = document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckBox = document.createElement("input");
    const todoCheckBoxLabel = document.createElement("label");
    const todoCross = document.createElement("span");

    todoText.textContent = todoObj.value;
    todoCheckBox.type = "checkbox";
    const checkboxId = `todo-${todoObj.id}`;
    todoCheckBox.id = checkboxId;
    todoCheckBoxLabel.htmlFor = checkboxId;
    todoCheckBox.addEventListener("change", function (){
        todoEl.classList.toggle("completed", todoCheckBox.checked);
        todoCheckBoxLabel.classList.toggle("active", todoCheckBox.checked);
        todoObj.checked = todoCheckBox.checked;
        countCompleted();
    });

    todoCross.textContent = "X";
    todoCross.addEventListener("click", function(){
        todoEl.remove();
        todos = todos.filter((t) => t.id !== todoObj.id);
        countCompleted();
    });

    todoEl.classList.add("todo");
    todoCheckBoxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todoEl.appendChild(todoCheckBox);
    todoEl.appendChild(todoCheckBoxLabel);
    todoEl.appendChild(todoText);
    todoEl.appendChild(todoCross);

    todosContainer.appendChild(todoEl);
}

function countCompleted(){
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
    });
    todos = todos.filter((t) => !t.checked);
    countCompleted();
}

function showAll(){
    document.querySelectorAll(".todo").forEach((todo) => {
        todo.classList.remove("hidden");
    });
}

function filterCompleted(){
    document.querySelectorAll(".todo").forEach((todo) => {
        const isCompleted = todo.querySelector("input").checked;
        todo.classList.toggle("hidden", !isCompleted);
    });
}

function filterActive(){
    document.querySelectorAll(".todo").forEach((todo) => {
        const isCompleted = todo.querySelector("input").checked;
        todo.classList.toggle("hidden", isCompleted);
    });
}

// Sortable (Drag and drop library)

Sortable.create(todosContainer, {
    animation: 150,
    dragClass: "ghost"
});

themeToggle.addEventListener("click", changeTheme);
clearButton.addEventListener("click", clearCompleted);
filterAllButton.addEventListener("click", showAll);
filterActiveButton.addEventListener("click", filterActive);
filterCompletedButton.addEventListener("click", filterCompleted);
