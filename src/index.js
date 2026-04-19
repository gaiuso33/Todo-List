// src/index.js

import "./style.css";

import {
  initDefaultProject,
  loadProjects,
  getProjects,
  addProject,
  addTodoToCurrent,
} from "./modules/todoManager";

import { loadFromStorage, saveToStorage } from "./modules/storage";
import { renderProjects, renderTodos } from "./modules/dom";
import { createTodo } from "./modules/todoFactory";

// Load from storage first
const storedData = loadFromStorage();

if (storedData) {
  loadProjects(storedData);
} else {
  initDefaultProject();
  saveToStorage(getProjects());
}

// Initial render
renderProjects();
renderTodos();

// Add Project Form
document.querySelector("#projectForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const projectInput = document.querySelector("#projectName");
  const projectName = projectInput.value.trim();

  if (projectName === "") return;

  addProject(projectName);
  saveToStorage(getProjects());

  renderProjects();
  renderTodos();

  projectInput.value = "";
});

// Add Todo Form
document.querySelector("#todoForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const description = document.querySelector("#description").value.trim();
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;

  if (!title || !description || !dueDate || !priority) return;

  const todo = createTodo(title, description, dueDate, priority);

  addTodoToCurrent(todo);
  saveToStorage(getProjects());

  renderTodos();

  e.target.reset();
});