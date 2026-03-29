# JSL_05_LEBMOK25571_PTO2508_B_LEBOGANG-MOKOENA_JSL05
# Kanban Task Management App

A browser-based Kanban board built with vanilla JavaScript and ES6 modules. Tasks are saved in local storage so they persist after refreshing or closing the app.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript ES6 Modules
- Local Storage API
- Google Fonts (Plus Jakarta Sans)

---

## Features

- Tasks load automatically from local storage on startup
- Tasks are saved to local storage every time one is added or edited
- Tasks are organised into To Do, Doing, and Done columns
- Add new tasks using the Add New Task button in the header
- Click any task card to view and edit its details
- Changes save automatically as you type
- Fully responsive on desktop, tablet, and mobile
- On mobile the Add New Task button becomes a round + icon
- Modals close with the X button, clicking outside, or pressing Escape

---

## Setup Instructions

1. Clone this repository
2. Open `index.html` in your browser

No installs or dependencies required.

---

## How To Use

1. Open the app - tasks load automatically
2. Click **+ Add New Task** to open the task creation modal
3. Fill in the title, description, and select a status
4. Click **Create Task** to add it to the board instantly
5. Click any task card to edit its details
6. Refresh the page - your tasks will still be there

---

## File Structure
```
project/
├── index.html        - Board layout and modals
├── initialData.js    - Starter tasks to seed local storage
├── style.css         - All styles and responsive design
└── js/
    ├── main.js       - App entry point
    ├── modal.js      - Modal open, close, and submit logic
    ├── storage.js    - Local storage operations
    └── tasks.js      - Task card rendering
```

---

## Author
Lebogang Mokoena
Built as part of the CodeSpace Academy JSL05 challenge.
