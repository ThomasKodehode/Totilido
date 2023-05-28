// Selectors - Velg de nødvendige elementene fra HTML
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners - Legg til lyttere for ulike hendelser
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions - Definer ulike funksjoner
//Stopper siden fra å laste på nytt når en trykker opå knappene
function addTodo(event) {
  event.preventDefault();

  // Opprett en ny todo-div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Opprett et nytt li-element for todo-teksten
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  // Opprett en knapp for å markere todo som fullført
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Opprett en knapp for å slette todo
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
  
    // Sjekk om elementet som ble klikket har klassen "trash-btn"
    if (item.classList.contains("trash-btn")) {
      const todo = item.parentElement;
      todo.classList.add("fall");
      removeLocalTodos(todo); // Fjern oppgaven fra lokal lagring
      todo.addEventListener("transitionend", function () {
        todo.remove(); // Fjern hele oppgaven fra visningen etter overgangseffekten
      });
    }
  
    // Sjekk om elementet som ble klikket har klassen "complete-btn"
    if (item.classList.contains("complete-btn")) {
      const todo = item.parentElement;
      todo.classList.toggle("completed"); // Bytt state til oppgaven mellom fullført og ikke fullført
    }
  }
  
  function filterTodo(event) {
    const todos = todoList.childNodes;
  
    // Gå gjennom hver oppgave og filtrer basert på valgt filter
    todos.forEach(function (todo) {
      switch (event.target.value) {
        case "all":
          todo.style.display = "flex"; // Vis oppgaven
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex"; // Vis oppgaven hvis den er fullført
          } else {
            todo.style.display = "none"; // Skjul oppgaven hvis den ikke er fullført
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex"; // Vis oppgaven hvis den ikke er fullført
          } else {
            todo.style.display = "none"; // Skjul oppgaven hvis den er fullført
          }
          break;
      }
    });
  }
  

function saveLocalTodos(todo) {
  // Sjekk om det allerede finnes todos i local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Legg til den nye oppgaven i listen
  todos.push(todo);

  // Oppdater den lagrede listen i local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // Sjekk om det allerede finnes oppgaver i todos local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Legg til hver oppgave i oppgavelisten
  todos.forEach(function (todo) {
    // Opprett en ny todo-div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Opprett et nytt li-element for todo-teksten
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Opprett en knapp for å markere todo som fullført
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Opprett en knapp for å slette todo
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Legg todo-div-en til oppgavelisten
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Sjekk om det allerede finnes todos i local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Finn indeksen til den oppgaven som skal slettes
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  // Oppdater den lagrede listen i local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
