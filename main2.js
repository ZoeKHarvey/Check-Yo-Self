var globalArray = [];
var titleInput = document.querySelector(".section__input--title");
var taskInput = document.querySelector(".section__input--task");
var saveButton =document.querySelector(".section__button--make-task");
var clearButton = document.querySelector(".section__button--clear")
var mainContainer = document.querySelector(".section__main");
var urgencyButton = document.querySelector(".section__button--filter");
var leftSide = document.querySelector(".section__left")
var addButton = document.querySelector(".section__img--plus")
var sideTasks = document.querySelector(".section__ul--task")

window.addEventListener('load', initializePage);
addButton.addEventListener("click", insertTask);
titleInput.addEventListener("keyup", checkInputHandler)
taskInput.addEventListener("keyup", checkInputHandler)
mainContainer.addEventListener('click', removeCard);
leftSide.addEventListener("click", removeTask)
saveButton.addEventListener("click", saveToDoList)
clearButton.addEventListener("click", clearEvent)
mainContainer.addEventListener("mouseover", eventHandlerHover);
mainContainer.addEventListener("mouseout", eventHandlerHoverClear);

function checkInputHandler(e) {
  enablePlusButton();
  enableClearButton();
  enableMakeTaskButton();
};

function saveEvent() {
  titleInput.value = "";
  promptUser();
};

function clearEvent() {
  var listElements = document.querySelector(".section__task--list");
  titleInput.value = "";
  taskInput.value = "";
  listElements.innerHTML = "";
};

function handleLeftSide(e) {
  enableMakeTaskButton(e);
};

function getGlobalItem(id) {
  return globalArray.filter(todo =>{ return todo.id == id})[0];
};

function enablePlusButton(e) {
  if (titleInput.value !="" && taskInput.value !="") {
    addButton.disabled = false; 
  } else {
    addButton.disabled = true;
  };
};

function enableClearButton(e) {
  if (titleInput.value === "" || taskInput.value ==="") {
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  };
};

function enableMakeTaskButton(e) {
  var listElements = document.querySelector(".section__task--list");
  if(titleInput.value === "" || listElements.innerHTML == "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  };
};

function checkmarkImgSource(e) {
  if (e.target.classList.contains("article__img--check")) {
    e.target.src = "icons/checkbox-active.svg";
  };
};

function eventHandlerHover(e) {
  if (e.target.classList.contains("article__img--delete")) {
    e.target.src = "icons/delete-active.svg";
  };
};

function eventHandlerHoverClear(e) {
  if(e.target.classList.contains("article__img--delete")) {
    e.target.src="icons/delete.svg";
  };
};

function getToDoId(e) {
  return event.target.closest(".article__card").dataset.id;
};

function findIndex(event) {
  var id = event.target.closest(".article__card").dataset.id;
  var index = globalArray.findIndex(obj => {
    return parseInt(id) === obj.id;
  });
  return index;
  };

function promptUser() {
  var prompt = document.querySelector(".h3__prompt");
  if (globalArray.length > 0) {
    prompt.style.visibility = "hidden";
  } else {
    prompt.style.visibility = "visible";
  };
};

function initializePage() {
  for (var i = 0; i<localStorage.length; i++) {
    var toDoListId = localStorage.key(i);
    var ToDoListClassItem = new ToDoList(false, toDoListId);
    appendToDo(ToDoListClassItem);
    globalArray.push(ToDoListClassItem);
  };
    promptUser();
};

function insertTask() {
  var tasks = document.querySelector(".section__task--list");
  var task = {
    id: 'tsk' + Date.now(),
    isCompleted: false,
    text:taskInput.value,
  };
  var taskInsert = taskInput.value;
  tasks.insertAdjacentHTML("beforeend", 
    `<div class="ul__li" id="${task.id}">
      <ul class="section__ul--task" aria-controls="submit-task">
        <img src="icons/delete.svg" class="section__button--delete" alt="Button to delete current card">
        <li class="task__body">${task.text}
      </ul>
    </div>`);
  taskInput.value = "";
  enablePlusButton();
  enableMakeTaskButton();
};

function createToDoList() {
  var newToDo = new ToDoList({
    id: Date.now(),
    title: titleInput.value,
    tasks: [],
    urgent: false,
  });
  appendToDo(newToDo);
  globalArray = newToDo;
  newToDo.saveToStorage(globalArray);
  promptUser();
};

function appendToDo(newToDo) {
  if (newToDo.urgent) {
    var urgentClass= "urgent'";
  } else {
    var urgentClass = "";
  };
  if (newToDo.isDisabled() == true) {
    var disClass = "disabled";
  } else {
    var disClass = "";
  };
  mainContainer.insertAdjacentHTML("afterbegin", 
    `<article class="article__card ${urgentClass} ${disClass}" data-id="${newToDo.id}"> 
      <div class="article__card--task">
        <h2 class="article__card--title">${newToDo.title}</h2>
      </div>
      <div class="article__ul--item" role="listbox">
        ${newToDo.getTaskHTML()}
      </div>
      <footer role="group">
        <div class="article__card--urgent-both">
          <span class="urgent-image ${urgentClass}"  onclick="markAsUrgent(event)" alt="mark as urgent button"></span>
          <p class="article__card--urgent">Urgent</p>
        </div>
        <div class="article__card--delete-both">
          <img class="article__img--delete" src="icons/delete.svg" alt="button to delete to-do list">
          <p>Delete</p> 
        </div>
      </footer>
    </article>`);
};

function saveToDoList(newToDo, e) {
  var newToDoList_ID = "todo" + Date.now();
  var newToDoList = new ToDoList(true, newToDoList_ID, titleInput.value);
  var taskElements = document.querySelectorAll(".ul__li");
  for(var i=0; i<taskElements.length; i++) {
    var taskID = taskElements[i].id;
    var taskText = taskElements[i].querySelector(".task__body").innerText;
    newToDoList.updateTask(taskID, false, taskText);
  };
  var classList = document.querySelector(".section__task--list");
  newToDoList.saveToStorage();
  appendToDo(newToDoList);
  globalArray.push(newToDoList);
  titleInput.value = "";
  taskInput.value = "";
  classList.innerHTML = "";
  saveButton.disabled = true;
  promptUser();
};

function completeCheckBox(e) {
  var card = e.target.closest(".article__card");
  var taskID = e.target.closest(".article__ul--li").dataset.id;
  var todoId = e.target.closest(".article__card").dataset.id;
  var todoClass = getGlobalItem(todoId);
  var checkBoxElement = e.target.closest(".article__ul--li").querySelector(".checkbox-image");
  checkBoxElement.classList.toggle("complete");
  if (checkBoxElement.classList.contains("complete")) {
    todoClass.updateTask(taskID, true);
  } else {
    todoClass.updateTask(taskID, false);
  };
  todoClass.saveToStorage();
  if(todoClass.isDisabled() == true) {
    card.classList.add("disabled");
  } else {
    card.classList.remove("disabled");
  };
  italicizeFont(e)
};

function italicizeFont(e) {
  var checkedListItem = e.target.closest(".article__ul--li");
  checkedListItem.classList.toggle("complete");
};

function markAsUrgent(e) {
  var todoId = e.target.closest(".article__card").dataset.id;
  var todoClass = getGlobalItem(todoId);
  e.target.closest('.article__card').classList.toggle("urgent");
  e.target.closest(".urgent-image").classList.toggle("urgent");
  if (e.target.closest('.article__card').classList.contains("urgent")) {
    todoClass.updateToDo('', true);
  } else {
    todoClass.updateToDo('', false);
  };
  todoClass.saveToStorage();
};

function removeCard(e) {
  var cardElement = e.target.closest(".article__card");
    if (e.target.className === "article__img--delete" && !cardElement.classList.contains("disabled")) {
      var cardId = cardElement.dataset.id;
      localStorage.removeItem(cardId);
      cardElement.parentElement.removeChild(cardElement);
    };
};

function removeTask(e) {
  if (e.target.className === "section__button--delete") {
    var taskElement = e.target.closest(".ul__li");
    taskElement.parentElement.removeChild(taskElement);
  };
};





