var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

if(localStorage.getItem("toDoList")) {
    incompleteTasksHolder.innerHTML = localStorage.getItem("toDoList");
}

if(localStorage.getItem("completedList")) {
    completedTasksHolder.innerHTML = localStorage.getItem("completedList");
}

var createNewTaskElement = function(taskString, arr) {
  listItem = document.createElement("li");
  checkBox = document.createElement("input");
  label = document.createElement("label");
  editInput = document.createElement("input");
  editButton = document.createElement("button");
  deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  var listItemName = taskInput.value || "New Item";
  if(listItemName === "New Item") {
    document.getElementById("new-task").style.borderColor = "red";
    document.getElementById("warning").style.display = "block";
    return;
  }
  listItem = createNewTaskElement(listItemName);
  incompleteTasksHolder.appendChild(listItem);
  localStorage.setItem("toDoList", incompleteTasksHolder.innerHTML);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelectorAll("input[type=text")[0];
  var label = listItem.querySelector("label");
  var button = listItem.getElementsByTagName("button")[0];

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
      label.innerText = editInput.value
      button.innerText = "Edit";
  } else {
     editInput.value = label.innerText
     button.innerText = "Save";
  }
  
  listItem.classList.toggle("editMode");
  localStorage.setItem("toDoList", incompleteTasksHolder.innerHTML);
  localStorage.setItem("completedList", completedTasksHolder.innerHTML);
};

var deleteTask = function (el) {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  localStorage.setItem("toDoList", incompleteTasksHolder.innerHTML);
  localStorage.setItem("completedList", completedTasksHolder.innerHTML);
};

var taskCompleted = function (el) {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  localStorage.setItem("completedList", completedTasksHolder.innerHTML);
  localStorage.setItem("toDoList", incompleteTasksHolder.innerHTML);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
  var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
  var editButton = taskListItem.querySelectorAll("button.edit")[0];
  var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}