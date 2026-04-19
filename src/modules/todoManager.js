import { createProject } from "./projectFactory";

let projects = [];
let currentProjectId = null;

export function initDefaultProject() {
  if (projects.length === 0) {
    const defaultProject = createProject("Default");
    projects.push(defaultProject);
    currentProjectId = defaultProject.id;
  }
}

export function getProjects() {
  return projects;
}

export function getCurrentProject() {
  return projects.find(p => p.id === currentProjectId);
}

export function setCurrentProject(projectId) {
  currentProjectId = projectId;
}

export function addProject(name) {
  const newProject = createProject(name);
  projects.push(newProject);
}

export function deleteProject(projectId) {
  projects = projects.filter(p => p.id !== projectId);
  if (currentProjectId === projectId && projects.length > 0) {
    currentProjectId = projects[0].id;
  }
}

export function addTodoToCurrent(todo) {
  const project = getCurrentProject();
  project.todos.push(todo);
}

export function deleteTodo(todoId) {
  const project = getCurrentProject();
  project.todos = project.todos.filter(t => t.id !== todoId);
}

export function toggleTodoComplete(todoId) {
  const project = getCurrentProject();
  const todo = project.todos.find(t => t.id === todoId);
  todo.completed = !todo.completed;
}

export function loadProjects(data) {
  projects = data;
  currentProjectId = projects.length > 0 ? projects[0].id : null;
}