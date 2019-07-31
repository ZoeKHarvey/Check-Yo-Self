class ToDoList {
  constructor(isNew, id, title, urgent, tasks) {
    var localStorageStr = localStorage.getItem(id);
    if (isNew) {
      this.id = id;
      this.title = title;
      this.urgent = urgent || false;
      this.disabled = true;
      this.tasks = [];
    } else {
      var obj = JSON.parse(localStorage.getItem(id));
      this.id = obj.id;
      this.title = obj.title;
      this.urgent = obj.urgent || false;
      this.disabled = obj.disabled || true;
      this.tasks = obj.tasks || [];
      };
  };

  isDisabled() {
    var completedTasks = this.tasks.filter(function(task) {
      return task.isCompleted == true;
    });
    if (completedTasks.length == this.tasks.length) {
      return false;
    } else {
      return true;
    };
  };
  
  saveToStorage(toDos) {
    localStorage.setItem(this.id, JSON.stringify(this));
  };

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }; 

  updateToDo(title, urgency) {
    if (title) {
      this.title = title;
    };
      this.urgent = urgency;
  };

  updateTask(taskID, isCompleted, text) {
    var taskFound = false;
    for (var i=0; i<this.tasks.length; i++) {
      if (this.tasks[i].id == taskID) {
        this.tasks[i].isCompleted = isCompleted;
        this.tasks[i].text = text || this.tasks[i].text;
        taskFound = true;
      };
    };
    if (taskFound == false) {
      var newTask = {
        id: taskID,
        isCompleted: isCompleted || false,
        text: text || ''
      };
      this.tasks.push(newTask);
    };
  };

  getTaskHTML() {
    var htmlStr = "";
      this.tasks.forEach((taskItem) =>{
        var isCompletedClass = "";
        if(taskItem.isCompleted == true) {
          isCompletedClass = "complete"
        };
        htmlStr += `<div class="article__ul--all" role="listbox">
                      <li class="article__ul--li ${isCompletedClass}" data-id="${taskItem.id}" onclick="completeCheckBox(event)">
                        <span role="checkbox" class="checkbox-image ${isCompletedClass}"></span>
                        ${taskItem.text}</li>
                    </div>`
    });
    return htmlStr
  };
};