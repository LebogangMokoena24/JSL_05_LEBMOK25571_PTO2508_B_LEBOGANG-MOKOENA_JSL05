/**
 * Key used to store tasks in localStorage
 */
const STORAGE_KEY = "tasks";

/**
 * Saves tasks array to localStorage
 * @param {Array} tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads tasks from localStorage
 * @returns {Array}
 */
export function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

/**
 * Clears all tasks from localStorage
 */
export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}
