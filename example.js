var ToDos = JSON.parse(localStorage.getItem('ToDoListArray')) || [];
var TaskListItems = [];
var taskTitleInput = document.querySelector('.form__inputTitle');
var taskListInput = document.querySelector('.div__inputAddTask');
var makeTaskBtn = document.querySelector('.form__btnsAddTask');
var clearBtn = document.querySelector('.form__btnsClear');
var addBtn = document.querySelector('.div__btnAddTask');
var taskListItems = document.querySelector('.form__ul');
var taskListUl = document.querySelector('.form__ul');
var userPrompt = document.querySelector('.main__userPrompt');
var mainContent = document.querySelector('.main');
var nav = document.querySelector('.nav');
var searchBar = document.querySelector('.header__input');
var urgencyBtn = document.querySelector('.form__btnsFilter')
var urgencyPrompt = document.querySelector('.main__urgencyPrompt')

taskTitleInput.addEventListener('keyup', enableMABtns);
taskListInput.addEventListener('keyup', enableMABtns);
addBtn.addEventListener('click', createTaskItem);
makeTaskBtn.addEventListener('click', handleMakeTaskList);
clearBtn.addEventListener('click', clearBtn);
nav.addEventListener('click', deleteLiFromNav);
mainContent.addEventListener('click', clickHandler);
searchBar.addEventListener('keyup', search);
urgencyBtn.addEventListener('click', filterUrgency)
window.addEventListener('load', windowHandler);

function windowHandler() {
  mapLocalStorage(ToDos)
  enableFilterBtn();
};

function mapLocalStorage(oldToDos) {
  var createNewToDos = oldToDos.map(function(object){
    return createToDoList(object);
  })
  ToDos = createNewToDos;
};

function enableMABtns() {
  makeTaskBtn.disabled = false;
  addBtn.disabled = false;
  clearBtn.disabled = false;
  disableMABtns();
};

function disableMABtns() {
  enableClearBtn();
  if (taskTitleInput.value === '' || taskListInput.value === '') {
  makeTaskBtn.disabled = true;
  addBtn.disabled = true;
  }
};

function enableClearBtn() {
  (taskTitleInput.value === '' && taskListInput.value === '')
  clearBtn.disabled = false;
};

function enableFilterBtn() {
  if (ToDos.length > 0) {
    urgencyBtn.disabled = false;
  }
};

function disableFilterBtn() {
  if (ToDos.length === 0) {
    urgencyBtn.disabled = true;
  }
};

function clearBtn(event) {
  event.preventDefault();
  taskTitleInput.value = '';
  taskListInput.value = '';
};

function appendTaskItem(object) {
  event.preventDefault();
  var taskId = object.id;
  var taskTitle = object.title;
  var taskItem = `
    <li class="form__li">
      <img src="images/delete.svg" class="form__liImg" data-id="${taskId}">${taskTitle}
    </li>`
  taskListUl.innerHTML += taskItem;
  taskListInput.value = '';
  addBtn.disabled = true;
};

function createTaskItem() {
  event.preventDefault();
  var newTodoItem = {
    id: Date.now(),
    title: taskListInput.value,
    completed: false
  }
  appendTaskItem(newTodoItem);
  TaskListItems.push(newTodoItem);
  return newTodoItem;
};

function clearInputs() {
  taskTitleInput.value = '';
  taskListInput.value = '';
  taskListUl.innerHTML = '';
};

function createToDoList(obj) {
  var uniqueId = obj.id;
  var newTitle = obj.title;
  var urgentStatus = obj.urgent;
  var newTasks = obj.tasks;
  var newTodo = new ToDoList({
    id: uniqueId,
    title: newTitle,
    urgent: urgentStatus,
    tasks: newTasks
  })
  appendToDo(newTodo);
  return newTodo;
};

function handleMakeTaskList() {
  if (TaskListItems.length !== 0) {
  event.preventDefault();
  var newTodo = new ToDoList ({
    id: Date.now(),
    title: taskTitleInput.value,
    urgent: false,
    tasks: TaskListItems
  });
  createToDoList(newTodo);
  ToDos.push(newTodo);
  newTodo.saveToStorage(ToDos);
  TaskListItems = [];
  enableFilterBtn();
  clearInputs();
  disableMABtns();
  clearBtn.disabled = true;
  } else {
    event.preventDefault()
    window.alert('You must add at least one task item to your ToDo list');
  }
};

function appendToDo(todo) {
  userPrompt.classList.add('hidden');
  var urgent = todo.urgent ? 'urgent-active.svg' : 'urgent.svg';
  var urgentClass = todo.urgent ? 'main__article card urgent__card' : 'main__article card';
  mainContent.insertAdjacentHTML('afterbegin', `<article class="${urgentClass}" data-id="${todo.id}">
      <header class="card__header">
        <h3 class="card__headerTitle">${todo.title}</h3>
      </header>
      <main class="card__main">
        <ul class="card__mainUl">
        ${appendTaskItemsToCard(todo)}
        </ul>
      </main>
      <footer class="card__footer">
        <div class="card__footerDiv">
          <img src="images/${urgent}" class="card__footerImg card__footerUrgent" alt="Click here to make this task urgent">
          <p class="card__footerMsg card__footerMsgUrgent">Urgent</p>
        </div>
        <div class="card__footerDiv">
          <img src="images/delete.svg" class="card__footerImg card__footerDlt" alt="Click here to delete this task">
          <p class="card__footerMsg">Delete</p>
        </div>
      </footer>
    </article>`)
};         

function promptReappear() {
  if (ToDos.length === 0) {
    userPrompt.classList.remove('hidden');
  }
};

function appendTaskItemsToCard(todo) {
  var taskArea = '';
  for(var i=0; i < todo.tasks.length; i++) {
    var checkStatus = todo.tasks[i].completed ? 'checkbox-active.svg' : 'checkbox.svg';
    var pClass = todo.tasks[i].completed ? 'card__mainLi--completed' : 'card__mainPara';
    taskArea += 
    `<li class="card__mainLi" data-id="${todo.tasks[i].id}">
        <img class="card__mainImg" src="images/${checkStatus}" alt="Click here to check off this task!">
        <p class="${pClass}">${todo.tasks[i].title}</p>
      </li>`
  } return taskArea;
};

function clickHandler(event) {
  deleteToDo(event);
  toggleCheckMark(event);
  toggleUrgent(event);
};

function getToDoId(event) {
  return event.target.closest('.card').getAttribute('data-id');
};

function getToDoIndex(id) {
  return ToDos.findIndex(function(arrayObj) {
    return arrayObj.id == parseInt(id);
  })
};

function deleteToDo(event) {
  if (event.target.closest('.card__footerDlt')) {
    var todoId = getToDoId(event)
    var todoIndex = getToDoIndex(todoId)
    enableDeleteBtn(event, todoIndex)
  }
  disableFilterBtn();
  promptReappear();
};

function deleteLiFromNav(event) {
  if (event.target.closest('.form__liImg')) {
    var navLiId = findNavLiId(event)
    var navLiIndex = findNavLiIndex(navLiId)
    TaskListItems.splice(navLiIndex, 1)
    event.target.closest('.form__li').remove();
  }
};

function findNavLiId(event) {
  return event.target.closest('.form__li').getAttribute('data-id');
};

function findNavLiIndex(id) {
  return TaskListItems.findIndex(function(arrayObj) {
    return arrayObj.id == parseInt(id);
  })
};

function toggleCheckMark(event) {
  if (event.target.closest('.card__mainImg')) {
    var todoId = getToDoId(event)
    var todoIndex = getToDoIndex(todoId)
    var todoObj = ToDos[todoIndex];
    var taskItemId = getTaskItemId(event)
    var taskItemIndex = getTaskItemIndex(taskItemId, todoObj)
    var taskItem = ToDos[todoIndex].tasks[taskItemIndex]
    ToDos[todoIndex].updateTask(ToDos, taskItemIndex)
    var check = todoObj.tasks[taskItemIndex].completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg'
    event.target.setAttribute('src', check);
    updateStyle(event);
  }
};

function updateStyle(event) {
  var paragraph = event.target.nextElementSibling;
  paragraph.classList.toggle('card__mainLi--completed');
  paragraph.classList.toggle('card__mainPara');
};

function findTask(obj, id) {
  return obj.tasks.findIndex(function(arrayObj) {
  return arrayObj.id == parseInt(id);
  })
};

function getTaskItemId(event) {
  return event.target.closest('.card__mainLi').getAttribute('data-id');
};

function getTaskItemIndex(id, obj) {
  return obj.tasks.findIndex(function(arrayObj) {
  return arrayObj.id == parseInt(id);
  }) 
};

function enableDeleteBtn(event, index) {
  var objectToDelete = ToDos[index].tasks;
  var newArray = objectToDelete.filter(function(arrayObj) {
     return arrayObj.completed === true;
  });
  if (newArray.length === objectToDelete.length) {
    event.target.closest('.card').remove();
    ToDos[index].deleteFromStorage(ToDos, index);
  }
  else {
    return;
  }
};

function toggleUrgent(event) {
  if(event.target.closest('.card__footerUrgent')) {
  var todoId = getToDoId(event);
  var todoIndex = getToDoIndex(todoId);
  ToDos[todoIndex].updateToDo(ToDos, todoIndex);
  var urgent = ToDos[todoIndex].urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
  event.target.setAttribute('src', urgent);
  updateUrgency(event, todoIndex);
  }
};

function updateUrgency(event, cardIndex) {
  var updateCard = event.target.closest('.card');
  var paragraph = event.target.nextElementSibling;
  updateCard.classList.toggle('urgent__card');
};

function search(event) {
  var searchText = event.target.value.toLowerCase();
  var searchResults = ToDos.filter(function(arrayObj){
    return arrayObj.title.toLowerCase().includes(searchText);
  });
  mainContent.innerHTML = '';
  searchResults.map(function(todo){
    appendToDo(todo);
  })
};

function filterUrgency(event) {
  event.target.classList.toggle('filter__search');
  if (event.target.classList.contains('filter__search')) {
  var results = ToDos.filter(function(arrayObj){
    return arrayObj.urgent === true;
  })
  urgentPrompt(results)
  mainContent.innerHTML = '';
  results.map(function(todo){
    appendToDo(todo);
    })
  } else {
    mainContent.innerHTML = '';
    ToDos.map(function(arrayObj) {
      appendToDo(arrayObj);
    })
  } 
};

function urgentPrompt(results) {
  if(results.length === 0) {
    urgencyPrompt.classList.toggle('hidden')
  }
};