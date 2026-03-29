import { loadTasks } from "./storage.js";
import { setTasks, tasks } from "./tasks.js";
import { openModal, closeModal, saveTask } from "./modal.js";
import { renderTasks } from "./ui.js";

/**
 * Initialize app
 */
function init() {
  const stored = loadTasks();

  if (stored) {
    setTasks(stored);
  } else {
    import("../data/initialData.js").then(module => {
      setTasks(module.initialTasks);
    });
  }

  renderTasks();
  attachEvents();
}

/**
 * Attach events
 */
function attachEvents() {
  document.getElementById("add-task-btn").addEventListener("click", () => openModal());

  document.getElementById("save-task-btn").addEventListener("click", () => saveTask(renderTasks));

  document.getElementById("modal-close-btn").addEventListener("click", closeModal);

  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });
}

document.addEventListener("DOMContentLoaded", init);
