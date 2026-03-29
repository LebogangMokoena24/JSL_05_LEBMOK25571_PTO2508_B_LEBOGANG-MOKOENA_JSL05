import { addTask, updateTask } from "./tasks.js";

/**
 * Active task being edited
 */
let activeTask = null;

/**
 * Open modal
 */
export function openModal(task = null) {
  activeTask = task;

  const modal = document.getElementById("modal-backdrop");

  document.getElementById("modal-title-input").value = task ? task.title : "";
  document.getElementById("modal-desc-input").value = task ? task.description : "";
  document.getElementById("modal-status-select").value = task ? task.status : "todo";

  modal.classList.add("active");
}

/**
 * Close modal
 */
export function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("active");
}

/**
 * Save task
 */
export function saveTask(render) {
  const title = document.getElementById("modal-title-input").value;
  const description = document.getElementById("modal-desc-input").value;
  const status = document.getElementById("modal-status-select").value;

  if (activeTask) {
    updateTask({
      ...activeTask,
      title,
      description,
      status
    });
  } else {
    addTask({
      id: Date.now(),
      title,
      description,
      status
    });
  }

  render();
  closeModal();
}
