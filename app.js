// Define variables for DOM elements
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

// Create a new task list item
const createNewTaskElement = function (taskString) {
    // Create DOM elements
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    // Set properties and classes of elements
    checkBox.type = "checkbox";
    checkBox.addEventListener("change", taskCompleted);
    label.textContent = taskString;
    label.className = "task";
    editInput.type = "text";
    editInput.className = "task";
    editButton.textContent = "Edit";
    editButton.className = "edit";
    editButton.addEventListener("click", editTask);
    deleteButton.className = "delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);
    deleteButton.addEventListener("click", deleteTask);

    // Append elements to the list item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

// Add a new task to the incomplete task list
const addTask = function () {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    taskInput.value = "";
};

// Edit an existing task
const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editButton = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.textContent = editInput.value;
        editButton.textContent = "Edit";
    } else {
        editInput.value = label.textContent;
        editButton.textContent = "Save";
    }

    listItem.classList.toggle("editMode");
};

// Delete a task
const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};

// Mark a task as completed
const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

// Bind task events to newly added items
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector(".edit");
    const deleteButton = taskListItem.querySelector(".delete");
    checkBox.addEventListener("change", checkBoxEventHandler);
    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);
};

// Add event listeners to existing elements
addButton.addEventListener("click", addTask);
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
