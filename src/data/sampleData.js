// src/data/sampleData.js
export const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Learn React" },
    "task-2": { id: "task-2", content: "Setup Trello Clone" },
    "task-3": { id: "task-3", content: "Build Drag & Drop" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
