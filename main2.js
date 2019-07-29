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
leftSide.addEventListener("click", removeTask)
saveButton.addEventListener("click", saveToDoList)
clearButton.addEventListener("click", clearEvent)
mainContainer.addEventListener("mouseover", eventHandlerHover);
mainContainer.addEventListener("mouseout", eventHandlerHoverClear);
// saveButton.addEventListener("mouseout", updateTasks);

function checkInputHandler(e) {
  enablePlusButton();
  enableClearButton();
  enableMakeTaskButton()
}


function saveEvent() {
  createToDoList();
  titleInput.value = ""
  console.log(tasksArray);
  promptUser()
  
  // saveTask();
}

function clearEvent() {
  titleInput.value = ""
  taskInput.value = ""
}

function handleLeftSide(e){
    enableMakeTaskButton(e)
    // enableClearButton(e)
    // promptUser()
}


function getGlobalItem(id){
  return globalArray.filter(todo =>{ return todo.id == id})[0]
}

function completeCheckBox(e) {
  var taskID = e.target.closest('.article__ul--li').dataset.id;
  var todoId = e.target.closest('.article__card').dataset.id;
  
  var todoClass = getGlobalItem(todoId);
  todoClass.updateTask(taskID, true);
  console.log(taskID, todoClass)
  todoClass.saveToStorage()

  e.target.closest('.article__ul--li').querySelector('.checkbox-image').classList.toggle('complete')
  // e.target.closest(".article__ul--li").querySelector(".article__ul--li").classList.toggle("complete")
}

function markAsUrgent(e) {
  var todoId = e.target.closest('.article__card').dataset.id;
  var todoClass = getGlobalItem(todoId);
  e.target.closest('.article__card').classList.toggle('urgent')
  e.target.closest(".article__img--urgent").classList.toggle("true")
  if (e.target.closest('.article__card').classList.contains("urgent")){
    todoClass.updateToDo('', true)
  }else{
    todoClass.updateToDo('', false)
  }
  todoClass.saveToStorage();
}

function initializePage() {
  for (var i = 0; i<localStorage.length; i++){
    var toDoListId = localStorage.key(i)
    var ToDoListClassItem = new ToDoList(false, toDoListId);
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
  console.log(taskInsert)
  tasks.insertAdjacentHTML("beforeend", `<div class="ul__li" id="${task.id}"><ul class="section__ul--task"><img src="icons/delete.svg" class="section__button--delete"><li class="task__body">${task.text}</div></ul>`)
  taskInput.value = "";
 }

 function saveToDoList(newToDo, e) {
  var newToDoList_ID = 'todo' + Date.now();
  var newToDoList = new ToDoList(true, newToDoList_ID, titleInput.value);
  var taskElements = document.querySelectorAll('.ul__li');
  for(var i=0; i<taskElements.length; i++){
    var taskID = taskElements[i].id;
    var taskText = taskElements[i].querySelector('.task__body').innerText;
    newToDoList.updateTask(taskID, false, taskText)
  }
  var classList = document.querySelector(".section__task--list")
  newToDoList.saveToStorage();
  appendToDo(newToDoList);
  globalArray.push(newToDoList);
  titleInput.value = ""
  classList.remove()
  saveButton.disabled = true
  promptUser()

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
  promptUser()
}

function appendToDo(newToDo) {
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
            <img class="article__img--urgent" onclick="markAsUrgent(event)" src="icons/urgent.svg ">
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
    if(e.target.className === "article__img--delete"){
      var cardElement = e.target.closest('.article__card')
      var cardId = cardElement.dataset.id;
      localStorage.removeItem(cardId);
      cardElement.parentElement.removeChild(cardElement)
    } 
}

function removeTask(e){
  if(e.target.className === "section__button--delete") {
    var taskElement = e.target.closest(".ul__li");
    taskElement.parentElement.removeChild(taskElement)
  }
}

function checkmarkImgSource(e) {
  if (e.target.classList.contains("article__img--check")) {
    e.target.src = "icons/checkbox-active.svg"
  // } if (e.target.src = "icons.checkbox-active.svg") {
  //   e.target.classList.contains("article__ul--li")
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
  console.log("global array length", globalArray.length)
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

function enableMakeTaskButton(e){
  console.log("enable task firing")
  var listElements = document.querySelector(".section__task--list")
  console.log("list elements ==", listElements)
  if(titleInput.value === "" && listElements.innerHTML === ""){
    console.log("TITLE ELEMENT ===", titleInput.value)
    console.log("LIST ELEMENTS.INNERHTML===", listElements.innerHTML)
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false
  }
}
