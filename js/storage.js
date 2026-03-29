/**
 * @fileoverview storage.js
 * Handles all local storage operations for the Kanban task manager.
 */

const STORAGE_KEY = "kanban_tasks";

/**
 * Saves the tasks array to local storage.
 * @param {Array<Object>} tasks - The array of task objects to save.
 * @returns {void}
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads tasks from local storage.
 * If no tasks exist, seeds with initialTasks from initialData.js.
 * @returns {Array<Object>} The array of task objects.
 */
export function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  saveTasks(initialTasks);
  return initialTasks;
}

/**
 * Adds a single new task to local storage.
 * @param {Object} task - The new task object to add.
 * @returns {void}
 */
export function addTaskToStorage(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

/**
 * Updates an existing task in local storage by its id.
 * @param {Object} updatedTask - The task object with updated values.
 * @returns {void}
 */
export function updateTaskInStorage(updatedTask) {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
  }
}
