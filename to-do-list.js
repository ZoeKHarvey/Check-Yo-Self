class ToDoList
{
    constructor(isNew, id, title, urgent, tasks) {
      var localStorageStr = localStorage.getItem(id);
      if(isNew){
        this.id = id;
        this.title = title;
        this.urgent = urgent || false;
        this.tasks = [];
      } else {
        let obj = JSON.parse(localStorage.getItem(id))
        this.id = obj.id;
        this.title = obj.title;
        this.urgent = obj.urgent || false;
        this.tasks = obj.tasks || [];
      }
    }
  
  saveToStorage(toDos) {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id)
  } 

  updateToDo(title, urgency){
    console.log(title, urgency)
    if (title){
      this.title = title;
    }
      this.urgent = urgency;
  }

  updateTask(taskID, isCompleted, text){
    var taskFound = false
    for (var i=0; i<this.tasks.length; i++){
      if (this.tasks[i].id == taskID){
        this.tasks[i].isCompleted = isCompleted;
        this.tasks[i].text = text || this.tasks[i].text;
        taskFound = true;
      }
    }
    if (taskFound == false){
      var newTask = {
        id: taskID,
        isCompleted: isCompleted || false,
        text: text || ''
      }
      this.tasks.push(newTask)
    }
  }

  getTaskHTML(){
    var htmlStr = '';
      this.tasks.forEach((taskItem) =>{
        console.log(taskItem)
        var isCompletedClass = '';
        if(taskItem.isCompleted == true){
          isCompletedClass = 'complete'
        }
        htmlStr += `<div class="article__ul--all"><li class="article__ul--li" data-id="${taskItem.id}" onclick="completeCheckBox(event)">
        <span class="checkbox-image ${isCompletedClass}"></span>
        ${taskItem.text}</li></div>`
    })
    return htmlStr
  }

}


// class ToDoList {
//   constructor(obj) {
//     this.id = obj.id;
//     this.title = obj.title;
//     this.urgent = obj.urgent || false;
//     this.tasks = [];
//   }

//   addTask(obj){
//     this.tasks.push(new Task(obj));
//   }

//   saveToStorage(toDos) {
//     localStorage.setItem("toDoListArray", JSON.stringify(this));
//   }

//   deleteFromStorage(index) {
//     globalArray = globalArray.filter(indexNum => {
//       return parseInt(index) !== indexNum.id})
//     this.saveToStorage(globalArray)
//   }

//   updateToDo() {

//   }

//   updateTask(taskObj) {
//     console.log("update task firing")
//     this.tasks.push(taskObj)
//     console.log("task")

// }
// }

// class Task {
//   constructor(obj) {
//     this.id = obj.id;
//     this.isCompleted = obj.isCompleted || false;
//     this.text = obj.text;
//   }
// }

