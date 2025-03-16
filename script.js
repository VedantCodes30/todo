// Select elements
const input = document.getElementById("input");
const addButton = document.querySelector("button");
const list = document.getElementById("list");
const themeToggle = document.getElementById("themeToggle");

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTaskElement(task.text, task.isLightMode);
  });
}

// Function to create a task element
function createTaskElement(taskText, isLightMode = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  // Apply light theme if needed
  if (isLightMode) {
    li.classList.add("light-item");
  }

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromStorage(taskText);
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Function to save task to localStorage
function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({
    text: taskText,
    isLightMode: document.body.classList.contains("light"),
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove task from localStorage
function removeTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);
  input.value = "";
}

// Event listener for button click
addButton.addEventListener("click", addTask);

// Allow pressing "Enter" to add tasks
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Theme Switch Function
function themeChange() {
  const body = document.body;
  body.classList.toggle("light");

  const isLightMode = body.classList.contains("light");
  localStorage.setItem("theme", isLightMode ? "light" : "dark");

  // Apply theme change to existing tasks
  document.querySelectorAll("li").forEach((li) => {
    if (isLightMode) {
      li.classList.add("light-item");
    } else {
      li.classList.remove("light-item");
    }
  });

  // Update theme mode for saved tasks
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => (task.isLightMode = isLightMode));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for theme toggle
themeToggle.addEventListener("click", themeChange);

// Load saved theme and tasks on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }
  loadTasks();
});
