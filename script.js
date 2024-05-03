var titleInput = document.getElementById("titleInput");
var taskInput = document.getElementById("taskInput");
var toDoContainer = document.getElementById("todoContainer");
var submitBtn = document.getElementById("submit-button");
var updateBtn = document.getElementById("update-button");


var allTodos =[]

if (localStorage.getItem("todos") != null){
 allTodos = JSON.parse( localStorage.getItem("todos"))
 displayTodo(allTodos)

}

function addToDo(){
    if (titleInput.value == "" || taskInput.value == "" ){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          
          });
    }else{

        var todo ={
       title :titleInput.value,
        task: taskInput.value,
        }
        allTodos.push(todo) 
        displayTodo(allTodos)
        clearForm()
        localStorage.setItem("todos", JSON.stringify(allTodos))
    }
}


function displayTodo(arr){
    var box = ""
 for (let i = 0; i<arr.length; i++) {
   box+= `
   <div class= "bg-white p-3 mb-1 border border-1 d-flex justify-content-between align-items-center shadow-sm">
   <div>
    <h2>${arr[i].title}</h2>
    <h5>${arr[i].task}</h5>
</div>
    <div class="p-2">
        <i class="fa-solid fa-trash-can p-2 fa-xl cursor-pointer"  onclick ="deleteTodos(${i})"style="color: #e2081e;"></i>
   <i class="fa-regular fa-pen-to-square p-2 fa-xl cursor-pointer" style="color: #198754;" onclick="preUpdate(${i})"></i>
   </div>
   </div> 

    ` 
 }
 toDoContainer.innerHTML = box; 
}

function clearForm(){
    titleInput.value = ""
    taskInput.value= "";
}


function deleteTodos(index){
    allTodos.splice(index,1)
    displayTodo(allTodos)
    localStorage.setItem("todos", JSON.stringify(allTodos))
}

var updatedIndex;
function preUpdate(index){
    updatedIndex = index
    titleInput.value = allTodos[index].title
    taskInput.value = allTodos[index].task
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

function updateTodo(){
    var updatedTodo ={
        title :titleInput.value,
        task: taskInput.value,

    }
    allTodos.splice(updatedIndex,1,updatedTodo)
    displayTodo(allTodos)
    clearForm()
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    localStorage.setItem("todos", JSON.stringify(allTodos))

}

function searchByTitle(term){
   
    var matchedTodo =[]
    for(var i = 0;i< allTodos.length; i++){
        if(allTodos[i].title.toLowerCase().includes(term.toLowerCase()) === true){
            matchedTodo.push(allTodos[i])
            }
        }
        console.log(matchedTodo);
        displayTodo(matchedTodo)
    }
  
    
function searchByTask(term){
    // console.log(term);
    var matchedTask =[]
    for(var i = 0;i< allTodos.length; i++){
        if(allTodos[i].task.toLowerCase().includes(term.toLowerCase()) === true){
             matchedTask.push(allTodos[i])
        }
    }
//   console.log(matchedTodo);
    displayTodo(matchedTask)
    

}





