/**
 * @fileoverview tasks.js
 * Handles rendering tasks on the Kanban board.
 */

import { loadTasks } from "./storage.js";
import { openTaskModal } from "./modal.js";

/**
 * Renders all tasks from local storage into their correct columns.
 * Clears existing content first to avoid duplicates.
 * Updates column header counts after rendering.
 * @returns {void}
 */
export function renderTasks() {
  const todoCont = document.getElementById("todo-tasks-container");
  const doingCont = document.getElementById("doing-tasks-container");
  const doneCont = document.getElementById("done-tasks-container");

  todoCont.innerHTML = "";
  doingCont.innerHTML = "";
  doneCont.innerHTML = "";

  let todoCount = 0;
  let doingCount = 0;
  let doneCount = 0;

 const tasks = loadTasks() || [];

  tasks.forEach((task) => {
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

  document.getElementById("toDoText").textContent = `TODO (${todoCount})`;
  document.getElementById("doingText").textContent = `DOING (${doingCount})`;
  document.getElementById("doneText").textContent = `DONE (${doneCount})`;
}

/**
 * Creates a single task card HTML element.
 * @param {Object} task - The task object to render.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.title - The task title.
 * @param {string} task.description - The task description.
 * @param {string} task.status - The task status.
 * @returns {HTMLDivElement} The task card element.
 */
export function createTaskCard(task) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-div");
  taskCard.textContent = task.title;
  taskCard.dataset.taskId = task.id;

  taskCard.addEventListener("click", () => openTaskModal(task));

  return taskCard;
}
