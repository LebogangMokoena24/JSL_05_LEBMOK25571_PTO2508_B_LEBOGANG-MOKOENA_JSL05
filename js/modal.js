/**
 * @fileoverview modal.js
 * Handles all modal interactions for the Kanban task manager.
 * Manages two modals:
 *  1. View/edit modal - opens when clicking an existing task card
 *  2. Add New Task modal - opens when clicking the Add New Task button
 */

import { updateTaskInStorage, addTaskToStorage } from "./storage.js";
import { renderTasks } from "./tasks.js";

/** @type {Object|null} Stores the currently selected task for editing */
let activeTask = null;

// ─────────────────────────────────────────────
// VIEW / EDIT TASK MODAL
// ─────────────────────────────────────────────

/**
 * Opens the view/edit modal with the selected task's details.
 * @param {Object} task - The task object to display.
 * @returns {void}
 */
export function openTaskModal(task) {
  activeTask = task;

  document.getElementById("modal-title-input").value = task.title;
  document.getElementById("modal-desc-input").value = task.description;
  document.getElementById("modal-status-select").value = task.status;

  document.getElementById("modal-backdrop").classList.add("active");
}

/**
 * Closes the view/edit task modal.
 * @returns {void}
 */
export function closeTaskModal() {
  document.getElementById("modal-backdrop").classList.remove("active");
  activeTask = null;
}

/**
 * Saves edits from the modal back to local storage and re-renders the board.
 * @returns {void}
 */
function saveTaskChanges() {
  if (!activeTask) return;

  activeTask.title = document.getElementById("modal-title-input").value;
  activeTask.description = document.getElementById("modal-desc-input").value;
  activeTask.status = document.getElementById("modal-status-select").value;

  updateTaskInStorage(activeTask);
  renderTasks();
}

// ─────────────────────────────────────────────
// ADD NEW TASK MODAL
// ─────────────────────────────────────────────

/**
 * Opens the Add New Task modal and clears all input fields.
 * @returns {void}
 */
export function openAddTaskModal() {
  document.getElementById("new-task-title").value = "";
  document.getElementById("new-task-desc").value = "";
  document.getElementById("new-task-status").value = "todo";

  document.getElementById("add-task-modal-backdrop").classList.add("active");
}

/**
 * Closes the Add New Task modal.
 * @returns {void}
 */
export function closeAddTaskModal() {
  document.getElementById("add-task-modal-backdrop").classList.remove("active");
}

/**
 * Generates a unique ID using the current timestamp.
 * @returns {number} A unique ID number.
 */
function generateId() {
  return Date.now();
}

/**
 * Reads the Add New Task form, validates it, creates a new task,
 * saves it to local storage, re-renders the board, and closes the modal.
 * @returns {void}
 */
function handleCreateTask() {
  const title = document.getElementById("new-task-title").value.trim();
  const description = document.getElementById("new-task-desc").value.trim();
  const status = document.getElementById("new-task-status").value;

  if (!title) {
    document.getElementById("new-task-title").focus();
    return;
  }

  const newTask = {
    id: generateId(),
    title,
    description,
    status,
  };

  addTaskToStorage(newTask);
  renderTasks();
  closeAddTaskModal();
}

// ─────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────

/**
 * Attaches all event listeners for both modals.
 * Called once on page load from main.js.
 * @returns {void}
 */
export function attachModalEventListeners() {
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("task-modal");

  closeBtn.addEventListener("click", closeTaskModal);

  backdrop.addEventListener("click", (event) => {
    if (!modal.contains(event.target)) {
      closeTaskModal();
    }
  });

  document.getElementById("modal-title-input").addEventListener("input", saveTaskChanges);
  document.getElementById("modal-desc-input").addEventListener("input", saveTaskChanges);
  document.getElementById("modal-status-select").addEventListener("change", saveTaskChanges);

  const addModalBackdrop = document.getElementById("add-task-modal-backdrop");
  const addModal = document.getElementById("add-task-modal");
  const addModalCloseBtn = document.getElementById("add-modal-close-btn");
  const addTaskBtn = document.getElementById("add-task-btn");
  const createTaskBtn = document.getElementById("create-task-btn");

  addTaskBtn.addEventListener("click", openAddTaskModal);
  addModalCloseBtn.addEventListener("click", closeAddTaskModal);

  addModalBackdrop.addEventListener("click", (event) => {
    if (!addModal.contains(event.target)) {
      closeAddTaskModal();
    }
  });

  createTaskBtn.addEventListener("click", handleCreateTask);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTaskModal();
      closeAddTaskModal();
    }
  });
}
