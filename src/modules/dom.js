// modules/dom.js

import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  deleteTodo,
  toggleTodoComplete,
} from "./todoManager";

import { saveToStorage } from "./storage";

export function renderProjects() {
  const projectList = document.querySelector("#projectList");
  projectList.innerHTML = "";

  const projects = getProjects();
  const currentProject = getCurrentProject();

  projects.forEach((project) => {
    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.name;

    // highlight current project
    if (currentProject && project.id === currentProject.id) {
      projectBtn.style.backgroundColor = "black";
      projectBtn.style.color = "white";
    }

    projectBtn.addEventListener("click", () => {
      setCurrentProject(project.id);
      renderProjects();
      renderTodos();
    });

    projectList.appendChild(projectBtn);
  });
}

export function renderTodos() {
  const todoList = document.querySelector("#todoList");
  todoList.innerHTML = "";

  const projectTitle = document.querySelector("#currentProjectTitle");
  const currentProject = getCurrentProject();

  if (!currentProject) {
    projectTitle.textContent = "No Project Selected";
    return;
  }

  projectTitle.textContent = currentProject.name;

  currentProject.todos.forEach((todo) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    // priority color
    if (todo.priority === "high") todoCard.style.borderLeft = "6px solid red";
    if (todo.priority === "medium") todoCard.style.borderLeft = "6px solid orange";
    if (todo.priority === "low") todoCard.style.borderLeft = "6px solid green";

    todoCard.innerHTML = `
      <h3 style="text-decoration:${todo.completed ? "line-through" : "none"}">
        ${todo.title}
      </h3>

      <p><strong>Due:</strong> ${todo.dueDate}</p>
      <p><strong>Priority:</strong> ${todo.priority}</p>

      <button class="toggle-btn">
        ${todo.completed ? "Undo" : "Complete"}
      </button>

      <button class="delete-btn">Delete</button>
    `;

    // Toggle complete
    todoCard.querySelector(".toggle-btn").addEventListener("click", () => {
      toggleTodoComplete(todo.id);
      saveToStorage(getProjects());
      renderTodos();
    });

    // Delete todo
    todoCard.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTodo(todo.id);
      saveToStorage(getProjects());
      renderTodos();
    });

    todoList.appendChild(todoCard);
  });
}