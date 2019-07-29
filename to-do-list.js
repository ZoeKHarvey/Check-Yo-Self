class ToDoList {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.urgent = obj.urgent || false;
    this.tasks = obj.task;
  }

  addTask(obj){
    this.tasks.push(new Task(obj));
  }

  saveToStorage(toDos) {
    localStorage.setItem("toDoListArray", JSON.stringify(toDos));
  }

  deleteFromStorage(index) {
    globalArray = globalArray.filter(indexNum => {
      return parseInt(index) !== indexNum.id})
    this.saveToStorage(globalArray)
  }

  updateToDo() {

  }

  updateTask(taskObj) {
    console.log("update task firing")
    this.tasks.push(taskObj)
    console.log("task")

}
}

class Task {
  constructor(obj) {
    this.id = obj.id;
    this.isCompleted = obj.isCompleted || false;
    this.text = obj.text;
  }
}

