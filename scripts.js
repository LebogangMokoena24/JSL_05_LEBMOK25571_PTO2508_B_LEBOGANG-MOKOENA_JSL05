import { loadTasks, saveTasks } from "./storage.js";
/**
 * Stores the currently selected task for editing in the modal
 */
let activeTask = null;

/**
 * Renders all tasks from initialTasks into their correct columns on the board.
 * Clears existing content first to avoid duplicates.
 */
function renderTasks() {
  const todoCont = document.getElementById("todo-tasks-container");
  const doingCont = document.getElementById("doing-tasks-container");
  const doneCont = document.getElementById("done-tasks-container");

  // Clear containers before re-rendering
  todoCont.innerHTML = "";
  doingCont.innerHTML = "";
  doneCont.innerHTML = "";

  let todoCount = 0;
  let doingCount = 0;
  let doneCount = 0;

  initialTasks.forEach((task) => {
    const taskCard = createTaskCard(task);

    if (task.status === "todo") {
      todoCont.appendChild(taskCard);
      todoCount++;
    } else if (task.status === "doing") {
      doingCont.appendChild(taskCard);
      doingCount++;
    } else if (task.status === "done") {
      doneCont.appendChild(taskCard);
      doneCount++;
    }
  });

  // Update column header counts
  document.getElementById("toDoText").textContent = `TODO (${todoCount})`;
  document.getElementById("doingText").textContent = `DOING (${doingCount})`;
  document.getElementById("doneText").textContent = `DONE (${doneCount})`;
}

/**
 * Creates a task card element.
 * @param {Object} task - The task object.
 * @returns {HTMLDivElement} Task card element.
 */
function createTaskCard(task) {
  const taskCard = document.createElement("div");

  taskCard.classList.add("task-div");
  taskCard.textContent = task.title;
  taskCard.dataset.taskId = task.id;

  // Open modal on click
  taskCard.addEventListener("click", () => openTaskModal(task));

  return taskCard;
}

/**
 * Opens the modal and populates it with the selected task details.
 * @param {Object} task
 */
function openTaskModal(task) {
  activeTask = task;

  document.getElementById("modal-title-input").value = task.title;
  document.getElementById("modal-desc-input").value = task.description;
  document.getElementById("modal-status-select").value = task.status;

  document.getElementById("modal-backdrop").classList.add("active");
}

/**
 * Saves edits made in the modal to the active task
 * and re-renders the board.
 */
function saveTaskChanges() {
  if (!activeTask) return;

  activeTask.title = document.getElementById("modal-title-input").value;
  activeTask.description =
    document.getElementById("modal-desc-input").value;
  activeTask.status =
    document.getElementById("modal-status-select").value;

  renderTasks();
}

/**
 * Closes the task modal.
 */
function closeTaskModal() {
  document.getElementById("modal-backdrop").classList.remove("active");
}

/**
 * Attaches all modal related event listeners.
 */
function attachModalEventListeners() {
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("task-modal");

  // Close button
  closeBtn.addEventListener("click", closeTaskModal);

  // Close when clicking outside modal
  backdrop.addEventListener("click", (event) => {
    if (!modal.contains(event.target)) {
      closeTaskModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTaskModal();
    }
  });

  // Save edits automatically
  document
    .getElementById("modal-title-input")
    .addEventListener("input", saveTaskChanges);

  document
    .getElementById("modal-desc-input")
    .addEventListener("input", saveTaskChanges);

  document
    .getElementById("modal-status-select")
    .addEventListener("change", saveTaskChanges);
}

/**
 * Initializes the board.
 */
function init() {
  renderTasks();
  attachModalEventListeners();
}

document.addEventListener("DOMContentLoaded", init);
