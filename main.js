var globalArray = []
var titleInput = document.querySelector(".section__p--task-title");
var taskInput = document.querySelector(".section__input--task");
var addTaskButton = document.querySelector(".section__button--plus");
var saveButton =document.querySelector(".section__button--make-task");
var clearButton = document.querySelector(".section__button--clear")
var searchInput = document.querySelector(".header__input--search");
var mainContainer = document.querySelector(".section__main");
var urgencyButton = document.querySelector(".section__button--filter");
var leftSide = document.querySelector(".section__left")
var tasks = document.querySelector(".section__task--list")
var addButton = document.querySelector(".section__button--plus")

// window.addEventListener('load', initializePage);
// makeTaskBtn.addEventListener('click', mainEvent);
addTaskButton.addEventListener("click", insertTask);
// mainContainer.addEventListener('click', removeTask);


saveButton.addEventListener("click", mainEvent)

function mainEvent() {
  appendToDo();
}

// function initializePage() {
//   var tempArray = getExistingTasks();
//     if(tempArray.length >0) {
//       loadTasks(tempArray)
//     }
//   }
 
 function getExistingTasks() {
  return JSON.parse(localStorage.getItem("toDoArray"))
 }

 function loadTasks(tempArray) {
  tempArray.forEach(function(element){
    buildTask(element);
    var todo = new ToDoList(element)
    globalArray.push(todo)
  })
 }

 function insertTask() {
  var taskInsert = taskInput.value;
  tasks.insertAdjacentHTML("afterEnd", `<ul class="section__ul--task"><div class="ul__li"> <img src="icons/delete.svg" class="section__button--delete"><li class="task__body">${taskInsert}</div></ul>`)
  taskInput.value = "";
 }




// function windowHandler() {
//   mapLocalStorage()
// }

// function targetSave(e) {
//   e.preventDefault();
//   if(e.target === saveButton) {
//     createToDoList()
//   }
// }

// function mapLocalStorage() {
//   console.log("map local storage working")
//   var createNewToDos = oldToDos.map(function(object) {
//     return createToDoList(object);
//   })
//   toDos = createNewToDos;
// }

function appendToDo(newToDo) {
  mainContainer.insertAdjacentHTML("afterbegin", `<article class="article__card" data-id="${newToDo.id}">
        <h2 class="article__card--title">"${newToDo.title}"</h2>
        <div>
          <img>
        </div>
        <footer>
          <div>
            <img>
            <p>Urgent</p>
          </div>
          <div>
            <img>
            <p>Delete</p> 
          </div>
        </footer>
        </article>"`);

}



// function getTitle(e) {
//   console.log("get title firing")
//   return titleInput.value;
// }

// function getTask(e) {
//   console.log("get task firing")
//   return taskInput.value;
// }

function getToDoId(e) {
  console.log("get id firing")
  return event.target.closest(".article__card").dataset("data-id")
}

function getIndex(e) {
  console.log("get index firing")
  var id = event.target.closest(".article__card").dataset.id;
  var getIndex = globalArray.findIndexobj (function(){
    return parseInt(id) === obj.id
  })
  return getIndex
  }


// function createTaskItem() {
//   event.preventDefault();
//   var newTodoItem = {
//     id: Date.now(),
//     title: taskListInput.value,
//     completed: false
//   }
//   appendTaskItem(newTodoItem);
//   TaskListItems.push(newTodoItem);
//   return newTodoItem;
// };

function createToDoList(obj) {
  console.log("create to do list firing")
  var id = obj.id;
  var newTitle = obj.title
  var newToDo = new ToDoList({
    id: Date.now(),
    title: taskInput.value,
    tasks: [],
    urgent: false,
  })
  appendToDo(newTodo);
 
}

// function appendTaskItem(object) {
//   event.preventDefault();
//   var taskId = object.id;
//   var taskTitle = object.title;
//   var taskItem = `
//     <li class="form__li">
//       <img src="images/delete.svg" class="form__liImg" data-id="${taskId}">${taskTitle}
//     </li>`
//   taskListUl.innerHTML += taskItem;
//   taskListInput.value = '';
// }