//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

todos =[];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded)
    secondCardBody.addEventListener("click",removeTodoTOUI)
    clearButton.addEventListener("click",allTodosEverywhere)
    filterInput.addEventListener("keyup",filter)
}

function filter(e){
    const filtervalue = e.target.value.toUpperCase().trim();
    const listItems=document.querySelectorAll(".list-group-item");
    if(listItems.length>0){
        listItems.forEach(function(todo){
            if(todo.textContent.toUpperCase().trim().includes(filtervalue)){
                todo.setAttribute("style","display : block")
            }else{
                todo.setAttribute("style","display : none !important")
            }    
        });
    }else{
        showAlert("warning","Fİltreleme yapmak için En Az Bir Liste Giriniz.")
    }
    
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function allTodosEverywhere(){
    const todoLists=document.querySelectorAll(".list-group-item");
    if(todoLists.length>0){
        todoLists.forEach(function(todo){
            todo.remove();
        });
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos))
        // localStorage.removeItem("todos");
        showAlert("success","Tüm Listeler Silindi");
    }else{
        showAlert("warning","Silmek İçin En Az Bir Liste olmalı.")
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===removeTodo){
            todos.splice(index,1);
        }
    });
        
        localStorage.setItem("todos",JSON.stringify(todos));
}


function removeTodoTOUI(e){
    if(e.target.className==="fa fa-remove"){
        const todo =e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent);
        showAlert("success","silindi");
    }
}


function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", "Lütfen boş bırakmayınız!");
    } else {
        //Arayüze ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","eklendiddddddddd");
    }

    //storage ekleme
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    /*
<li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li>
                        */
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";



}
function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));    
    
};

function checkTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos=[];
    }else{ 
        todos=JSON.parse(localStorage.getItem("todos"));
    }
};

function showAlert(type,message){
    const div = document.createElement("div")
    div.className=`alert alert-${type}`;
    div.textContent=message;
    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },1000);
}

