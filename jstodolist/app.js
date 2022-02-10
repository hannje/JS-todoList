//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners

document.addEventListener("DOMContentLoaded",getTodos );
todoButton.addEventListener('click',addTodo);
todoList.addEventListener("click",deleteCheck)


//functions

function addTodo(event){

    event.preventDefault();

    //DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

   //local storage
   saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerText = "🏳‍🌈";
 //   completedButton.innerText = "CMPLTD";
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerText = "🚩";
 //   trashButton.innerHTML = "<i>🚩</i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
 
    todoList.appendChild(todoDiv);
    todoInput.value = '';

}

function deleteCheck(e)
{
   const item = e.target;

   if(item.classList[0] === 'trash-btn')
   {
      const todo = item.parentElement;
      todo.classList.add('fall');
//      item.parentElement.classList.add("fall");
      removeLocalTodos(todo);

      todo.addEventListener("transitionend", function(){todo.remove();});

//      item.parentElement.remove();
   }

   if (item.classList[0] === "complete-btn") 
   {
    item.parentElement.classList.toggle('completed');
  }

}

function saveLocalTodos(todo)
{
   //check for redundancy
   console.log(todo);
   let todos;

   if(localStorage.getItem('todos')===null ){
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem('todos'));

   }

   todos.push(todo);
   localStorage.setItem('todos',JSON.stringify(todos));

}

function getTodos(){
    let todos;
    console.log("getTodos")

    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    
    const completedButton = document.createElement("button");
    completedButton.innerText = "🏳‍🌈";
    //   completedButton.innerText = "CMPLTD";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerText = "🚩";
    //   trashButton.innerHTML = "<i>🚩</i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    console.log("getTodos")

    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
    



   }