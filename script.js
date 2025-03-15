// Select elements
const input = document.getElementById("input");
const addButton = document.querySelector("button");
const list = document.getElementById("list");
const themeToggle = document.getElementById("themeToggle");

// Function to add task
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Apply current theme to new tasks
  if (document.body.classList.contains("light")) {
    li.classList.add("light-item");
  }

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => li.remove());

  li.appendChild(deleteBtn);
  list.appendChild(li);
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

  // Save theme preference
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
}

// Event listener for theme toggle
themeToggle.addEventListener("click", themeChange);

// Load saved theme preference
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");

    // Apply light theme to existing tasks
    document.querySelectorAll("li").forEach((li) => {
      li.classList.add("light-item");
    });
  }
});
