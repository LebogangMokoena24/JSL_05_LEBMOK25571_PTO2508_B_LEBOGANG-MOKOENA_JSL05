/**
 * @fileoverview main.js
 * Entry point for the Kanban Task Management application.
 *
 * Module responsibilities:
 *  - storage.js  → Read and write tasks to local storage
 *  - tasks.js    → Render task cards onto the board
 *  - modal.js    → Handle all modal open, close, and submit interactions
 *  - main.js     → Boot the app (this file)
 */

import { renderTasks } from "./tasks.js";
import { attachModalEventListeners } from "./modal.js";

/**
 * Initializes the application.
 * Renders tasks from local storage and attaches all event listeners.
 * @returns {void}
 */
function init() {
  renderTasks();
  attachModalEventListeners();
}

document.addEventListener("DOMContentLoaded", init);
