const STORAGE_KEY = "todoAppData";

export function saveToStorage(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  return JSON.parse(data);
}