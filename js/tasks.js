import { saveTasks } from "./storage.js";

/**
 * Tasks state
 */
export let tasks = [];

/**
 * Set tasks
 */
export function setTasks(newTasks) {
  tasks = newTasks;
  saveTasks(tasks);
}

/**
 * Add task
 */
export function addTask(task) {
  tasks.push(task);
  saveTasks(tasks);
}

/**
 * Update task
 */
export function updateTask(updatedTask) {
  tasks = tasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(tasks);
}
