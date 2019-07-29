var globalArray = [];
var tasksArray = [];
var titleInput = document.querySelector(".section__input--title");
var taskInput = document.querySelector(".section__input--task");
var addTaskButton = document.querySelector(".section__img--plus");
var saveButton =document.querySelector(".section__button--make-task");
var clearButton = document.querySelector(".section__button--clear")
var searchInput = document.querySelector(".header__input--search");
var mainContainer = document.querySelector(".section__main");
var urgencyButton = document.querySelector(".section__button--filter");
var leftSide = document.querySelector(".section__left")
var tasks = document.querySelector(".section__task--list")
var addButton = document.querySelector(".section__img--plus")
var sideTasks = document.querySelector(".section__ul--task")
// var sideDelete = document.querySelector(".section__button--delete")


window.addEventListener('load', initializePage);
// makeTaskBtn.addEventListener('click', mainEvent);
addButton.addEventListener("click", insertTask);
titleInput.addEventListener("keyup", checkInputHandler)
taskInput.addEventListener("keyup", checkInputHandler)
mainContainer.addEventListener('click', removeCard);
leftSide.addEventListener("click", handleLeftSide)
saveButton.addEventListener("click", saveToDoList)
clearButton.addEventListener("click", clearEvent)
mainContainer.addEventListener("mouseover", eventHandlerHover);
mainContainer.addEventListener("mouseout", eventHandlerHoverClear);
// saveButton.addEventListener("mouseout", updateTasks);

function checkInputHandler(e) {
  enablePlusButton();
  enableClearButton()
}


function saveEvent() {
  createToDoList();
  titleInput.value = ""
  console.log(tasksArray)
  
  // saveTask();
}

function clearEvent() {
  titleInput.value = ""
  taskInput.value = ""

}

function handleLeftSide(e){
    // enableMakeTaskButton(e)
    // enableClearButton(e)
    // promptUser()
}


function getGlobalItem(id){
  return globalArray.filter(todo =>{ return todo.id == id})[0]
}

function completeCheckBox(e) {
  let taskID = e.target.closest('.article__ul--li').dataset.id;
  let todoId = e.target.closest('.article__card').dataset.id;
  
  let todoClass = getGlobalItem(todoId);
  todoClass.updateTask(taskID, true);
  console.log(taskID, todoClass)
  todoClass.saveToStorage()

  e.target.closest('.article__ul--li').querySelector('.checkbox-image').classList.toggle('complete')
}

function markAsUrgent(e) {

  let todoId = e.target.closest('.article__card').dataset.id;
  
  let todoClass = getGlobalItem(todoId);
  e.target.closest('.article__card').classList.toggle('urgent')
  if (e.target.closest('.article__card').classList.contains("urgent")){
    todoClass.updateToDo('', true)
  }else{
    todoClass.updateToDo('', false)
  }
  console.log(todoClass)
  todoClass.saveToStorage();
}


// function removeSideTask(e) {
//   console.log("remove task firing")
//  if(e.target.className === "section__button--delete"){
//       var index = findIndex(e)
//       globalArray[index].deleteFromStorage(getToDoId(e))
//       event.target.closest(".article__card").remove()
// }}

function initializePage() {
  for (let i = 0; i<localStorage.length; i++){
    const toDoListId = localStorage.key(i)
    console.log('local storage todolistid:' + toDoListId);

    let ToDoListClassItem = new ToDoList(false, toDoListId);
    appendToDo(ToDoListClassItem);
    globalArray.push(ToDoListClassItem);
  }

    promptUser()
  }
 


 function insertTask() {
  console.log("instert task firing");
  var task = {
    id: 'tsk' + Date.now(),
    isCompleted: false,
    text:taskInput.value,
  }
  var taskInsert = taskInput.value;
  tasks.insertAdjacentHTML("beforeend", `<div class="ul__li" id="${task.id}"><ul class="section__ul--task"><img src="icons/delete.svg" class="section__button--delete"><li class="task__body">${task.text}</div></ul>`)
  taskInput.value = "";
  saveButton.disabled = false;
 }

 function saveToDoList(newToDo, e) {
  console.log('save to do list')
  let newToDoList_ID = 'todo' + Date.now();
  var newToDoList = new ToDoList(true, newToDoList_ID, titleInput.value);

  let taskElements = document.querySelectorAll('.ul__li');
  for(let i=0; i<taskElements.length; i++){
    console.log(taskElements[i])
    let taskID = taskElements[i].id;
    let taskText = taskElements[i].querySelector('.task__body').innerText;
    newToDoList.updateTask(taskID, false, taskText)
  }

  newToDoList.saveToStorage();
  appendToDo(newToDoList);
  globalArray.push(newToDoList)
  console.log(newToDoList)
}


 function createToDoList() {
  var newToDo = new ToDoList({
    id: Date.now(),
    title: titleInput.value,
    tasks: [],
    urgent: false,
  })
  appendToDo(newToDo);
  globalArray = newToDo;
  newToDo.saveToStorage(globalArray);
}

// function urgentImgSource() {
//   console.log("urgent button shit firing")
//   var imgSource = "icons/urgent.svg";
//   if (toDo.urgent === true) {
//     imgSource = "icons/urgent-active.svg"
//     debugger;
//   }
//   return imgSource
// }

function appendToDo(newToDo) {
  console.log("new to do ==", newToDo);

  if(newToDo.urgent){
    var urgentClass= 'urgent'
  } else {
    var urgentClass = ''
  }
  console.log(urgentClass)
  mainContainer.insertAdjacentHTML("afterbegin", `<article class="article__card ${urgentClass}" data-id="${newToDo.id}""> 
    <div class="article__card--task">
        <h2 class="article__card--title">${newToDo.title}</h2>
    </div>
    <div class="article__ul--item">
    ${newToDo.getTaskHTML()}
    </div>
        <footer>
            <div class="article__card--urgent-both">
            <img class="article__img--urgent" onclick="markAsUrgent(event)" src="icons/urgent.svg">
            <p class="article__card--urgent">Urgent</p>
          </div>
          <div class="article__card--delete-both">
            <img class="article__img--delete" src="icons/delete.svg">
            <p>Delete</p> 
          </div>
        </footer>
        </article>`);
}

function removeCard(e) {
  console.log('remove')
    if(e.target.className === "article__img--delete"){
      let cardElement = e.target.closest('.article__card')
      var cardId = cardElement.dataset.id;
      localStorage.removeItem(cardId);
      cardElement.parentElement.removeChild(cardElement)
    } 
    promptUser()
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
  return event.target.closest(".article__card").dataset.id
}


function findIndex(event) {
  var id = event.target.closest(".article__card").dataset.id;
  var index = globalArray.findIndex(obj => {
    return parseInt(id) === obj.id
  })
  return index
  }

function promptUser(){
  console.log("prompt user firing === global array length", globalArray.length)
  var prompt = document.querySelector(".h3__prompt")
  if(globalArray.length > 0) {
   prompt.style.visibility = "hidden";
  } else {
    prompt.style.visibility = "visible"
  }
}





/*******  BUTTONS *******/

function enablePlusButton(e) {
  if (titleInput.value !="" && taskInput.value !=""){
    addButton.disabled = false 
  }else{
    addButton.disabled = true;
  }
}

function enableClearButton(e) {
  if (titleInput.value > "" || taskInput.value >"") {
    clearButton.disabled = false
  }else{
    clearButton.disabled = true
  }
}

// function clearInputs(e) {
//   console.log("clear inputs firing")
//   taskInput.value === "" 
//   titleInput.value === ""
//   console.log("title value", titleInput.value)
// }




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