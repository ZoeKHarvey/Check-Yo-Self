class ToDoList {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.urgent = obj.urgent || false;
    this.tasks = [];
  }

  saveToStorage(toDos) {
    localStorage.setItem("toDoListArray", JSON.stringify(toDos));

  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }
}
