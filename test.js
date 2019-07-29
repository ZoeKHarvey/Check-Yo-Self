
var globalArray = [];
var tasksArray = [];
var titleInput = document.querySelector(".section__input--title");
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
// var sideTasks = document.querySelector(".ul__li")
// var sideDelete = document.querySelector("section__button--delete")


window.addEventListener('load', initializePage);
// makeTaskBtn.addEventListener('click', mainEvent);
addTaskButton.addEventListener("click", insertTask);
mainContainer.addEventListener('click', removeCard);
// sideTasks.addEventListener("click", removeSideTask)




saveButton.addEventListener("click", mainEvent)
mainContainer.addEventListener("mouseover", eventHandlerHover);
mainContainer.addEventListener("mouseout", eventHandlerHoverClear)

function mainEvent() {
  createToDoList();
  saveTask();
}

// function removeSideTask(e) {
//   console.log("remove task firing")
//   e.target.closest(".section__ul--task").remove()
// }

function initializePage() {
  var tempArray = getExistingTasks();
    if(tempArray.length >0) {
      loadTasks(tempArray);
    }
  }
 
 function getExistingTasks() {
  return JSON.parse(localStorage.getItem("toDoListArray"))
 }

 function loadTasks(tempArray) {
  tempArray.forEach(function(element){
    appendToDo(element);
    var newToDo = new ToDoList(element)
    globalArray.push(newToDo)
  })
 }

 function insertTask() {
  var task = new Task({
    id:Date.now(),
    isCompleted: false,
    text:taskInput.value,
  })
  tasksArray.push(task)
  var taskInsert = taskInput.value;
  tasks.insertAdjacentHTML("afterEnd", `<ul class="section__ul--task"><div class="ul__li"> <img src="icons/delete.svg" class="section__button--delete"><li class="task__body">${taskInsert}</div></ul>`)
  taskInput.value = "";
 }

 function saveTask(newToDo, e) {
  if (tasksArray.length === 0 || taskInput.value ==="") {
    return "No Inputs"
  } else {
    var newToDo = new ToDoList({
      id: Date.time(),
      title: taskInput.value,
      tasks: [],
      urgent: false,
    });
    globalArray.push(newToDo);
    globalArray[0].updateTask(tasksArray[0])
    newToDo.saveToStorage(globalArray);
    appendToDo(newToDo);
    tasksArray = []
  }


function populateTasks(array) {
  var list = `<ul class="article__ul"`;
  tasksArray.forEach(function(taskItem){
    list += `li class="article__ul--li" data-id="${taskItem.id}" <img src="icons/checkbox.svg" class="article__img--checkbox">${taskItem.text}`
  })
  return list
}

 function createToDoList() {
  console.log("create to do list firing")
  var newToDo = new ToDoList({
    id: Date.now(),
    title: titleInput.value,
    tasks: [],
    urgent: false,
  })
  appendToDo(newToDo);
  globalArray.push(newToDo);
  newToDo.saveToStorage(globalArray);
}



function appendToDo(newToDo) {
  console.log(newToDo)
  mainContainer.insertAdjacentHTML("afterbegin", `<article class="article__card" data-id=${newToDo.id}> 
    <div class="article__card--task"
    <img class="article__img--check" src=${checkmarkImgSource}>
        <h2 class="article__card--title">${newToDo.title}</h2>
    </div>
    <div class="aricle__ul--item">${populateTasks(globalArray)}</div>
        <footer>
            <div class="article__card--urgent-both">
            <img class="article__img--urgent" src=${urgentImgSource}>
            <p class="article__card--urgent">Urgent</p>
          </div>
          <div class="article__card--delete-both">
            <img class="article__img--delete" src="icons/delete.svg">
            <p>Delete</p> 
          </div>
        </footer>
        </article>`);
}

function urgentImgSource(newToDo) {
  var imgSource = "icons/urgent.svg";
  if (toDo.urgent === true) {
    imgSource = "icons/urgent-active.svg"
  }
  return imgSource
}

function checkmarkImgSource(e) {
  if (e.target.classList.contains("article__img--check")) {
    e.target.src = "icons/checkbox-active.svg"
  }
}

function eventHandlerHover(e) {
  if (e.target.classList.contains("article__img--delete")){
    e.target.src = "icons/delete-active.svg"
  }
}

function eventHandlerHoverClear(e) {
  if(e.target.classList.contains("article__img--delete")){
    e.target.src="icons/delete.svg"
  }
}

function getToDoId(e) {
  console.log("get id firing")
  return event.target.closest(".article__card").dataset.id
}


function findIndex(event) {
  console.log("get index firing")
  var id = event.target.closest(".article__card").dataset.id;
  var index = globalArray.findIndex(obj => {
    return parseInt(id) === obj.id
  })
  return index
  }

 function removeCard(e) {
    if(e.target.className === "article__img--delete"){
      var index = findIndex(e)
      globalArray[index].deleteFromStorage(getToDoId(e))
      event.target.closest(".article__card").remove()
    }
    }



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





// function getTitle(e) {
//   console.log("get title firing")
//   return titleInput.value;
// }

// function getTask(e) {
//   console.log("get task firing")
//   return taskInput.value;
// }





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
