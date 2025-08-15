const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");
const themeToggle = document.querySelector("#theme-toggle");
const clearButton = document.querySelector("#clear-completed");
const filterAllButton = document.querySelector("#filter-all");
const filterActiveButton = document.querySelector("#filter-active");
const filterCompletedButton = document.querySelector("#filter-completed");

const TODOS_KEY = "todos";
const THEME_KEY = "theme";

let todos = [];

loadTheme();
loadTodos();

todoInput.addEventListener("keyup", function(e){
    if (e.key === "Enter" && e.target.value.trim() !== ""){
        const todo = { id: Date.now(), value: e.target.value.trim(), checked: false };
        todos.push(todo);
        newTodo(todo);
        todoInput.value = "";
        countCompleted();
        saveTodos();
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
        saveTodos();
    });

    todoCross.textContent = "X";
    todoCross.addEventListener("click", function(){
        todoEl.remove();
        todos = todos.filter((t) => t.id !== todoObj.id);
        countCompleted();
        saveTodos();
    });

    todoEl.classList.add("todo");
    todoCheckBoxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todoCheckBox.checked = todoObj.checked;
    todoEl.classList.toggle("completed", todoObj.checked);
    todoCheckBoxLabel.classList.toggle("active", todoObj.checked);

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
    saveTheme();
}

function clearCompleted(){
    document.querySelectorAll(".todo").forEach((todo) => {
        if (todo.querySelector("input").checked){
            todo.remove();
        }
    });
    todos = todos.filter((t) => !t.checked);
    countCompleted();
    saveTodos();
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

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function loadTodos(){
    const stored = localStorage.getItem(TODOS_KEY);
    if (stored) {
        todos = JSON.parse(stored);
        todos.forEach(newTodo);
    }
    countCompleted();
}

function saveTheme(){
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme);
}

function loadTheme(){
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === "light") {
        document.body.classList.add("light");
    }
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
