const STORAGE_KEY = "kanban_tasks";

/**
 * Loads tasks from local storage.
 * If empty, seeds from initialTasks.
 */
export function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored);
  }

  // FIX: access initialTasks from window
  const tasks = window.initialTasks || [];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return tasks;
}

/**
 * Save tasks
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Add new task
 */
export function addTaskToStorage(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

/**
 * Update task
 */
export function updateTaskInStorage(updatedTask) {
  const tasks = loadTasks();

  const index = tasks.findIndex((t) => t.id === updatedTask.id);

  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
  }
}
