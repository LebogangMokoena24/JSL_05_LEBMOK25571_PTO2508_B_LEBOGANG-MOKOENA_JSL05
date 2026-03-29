import { updateTaskInStorage, addTaskToStorage } from "./storage.js";
import { renderTasks } from "./tasks.js";

let activeTask = null;

// ==========================
// VIEW / EDIT TASK
// ==========================
export function openTaskModal(task) {
  activeTask = task;

  document.getElementById("modal-title-input").value = task.title;
  document.getElementById("modal-desc-input").value = task.description;
  document.getElementById("modal-status-select").value = task.status;

  document.getElementById("modal-backdrop").classList.add("active");
}

function closeTaskModal() {
  document.getElementById("modal-backdrop").classList.remove("active");
  activeTask = null;
}

function saveTaskChanges() {
  if (!activeTask) return;

  activeTask.title = document.getElementById("modal-title-input").value;
  activeTask.description =
    document.getElementById("modal-desc-input").value;
  activeTask.status =
    document.getElementById("modal-status-select").value;

  updateTaskInStorage(activeTask);
  renderTasks();
  closeTaskModal();
}

// ==========================
// ADD NEW TASK
// ==========================
function openAddTaskModal() {
  document.getElementById("new-task-title").value = "";
  document.getElementById("new-task-desc").value = "";
  document.getElementById("new-task-status").value = "todo";

  document
    .getElementById("add-task-modal-backdrop")
    .classList.add("active");
}

function closeAddTaskModal() {
  document
    .getElementById("add-task-modal-backdrop")
    .classList.remove("active");
}

function handleCreateTask() {
  const title = document.getElementById("new-task-title").value.trim();
  const description = document
    .getElementById("new-task-desc")
    .value.trim();
  const status = document.getElementById("new-task-status").value;

  if (!title) {
    alert("Please enter a task title");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
  };

  addTaskToStorage(newTask);
  renderTasks();
  closeAddTaskModal();
}

// ==========================
// EVENTS
// ==========================
export function attachModalEventListeners() {
  // EDIT MODAL
  document
    .getElementById("modal-close-btn")
    .addEventListener("click", closeTaskModal);

  document
    .getElementById("save-task-btn")
    .addEventListener("click", saveTaskChanges);

  const backdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("task-modal");

  backdrop.addEventListener("click", (e) => {
    if (!modal.contains(e.target)) closeTaskModal();
  });

  // ADD MODAL
  document
    .getElementById("add-task-btn")
    .addEventListener("click", openAddTaskModal);

  document
    .getElementById("add-modal-close-btn")
    .addEventListener("click", closeAddTaskModal);

  document
    .getElementById("create-task-btn")
    .addEventListener("click", handleCreateTask);

  const addBackdrop = document.getElementById(
    "add-task-modal-backdrop"
  );
  const addModal = document.getElementById("add-task-modal");

  addBackdrop.addEventListener("click", (e) => {
    if (!addModal.contains(e.target)) closeAddTaskModal();
  });

  // ESC KEY
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTaskModal();
      closeAddTaskModal();
    }
  });
}
