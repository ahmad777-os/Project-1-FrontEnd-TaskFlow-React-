import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { FaPlus } from "react-icons/fa";

// Sample initial data
const initialData = {
  tasks: {},
  columns: {},
  columnOrder: [],
};

const Board = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("trelloData");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("trelloData", JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData({
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const addColumn = () => {
    const newColumnId = `column-${Date.now()}`;
    const newColumn = { id: newColumnId, title: "New Column", taskIds: [] };

    setData({
      ...data,
      columns: { ...data.columns, [newColumnId]: newColumn },
      columnOrder: [...data.columnOrder, newColumnId],
    });
  };

  const deleteColumn = (columnId) => {
    const newColumns = { ...data.columns };
    delete newColumns[columnId];
    const newColumnOrder = data.columnOrder.filter((id) => id !== columnId);

    setData({ ...data, columns: newColumns, columnOrder: newColumnOrder });
  };

  const renameColumn = (columnId, newTitle) => {
    const updatedColumn = { ...data.columns[columnId], title: newTitle };
    setData({
      ...data,
      columns: { ...data.columns, [columnId]: updatedColumn },
    });
  };

  const addTask = (columnId, content) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };

    const newTasks = { ...data.tasks, [newTaskId]: newTask };
    const newColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, newTaskId],
    };

    setData({
      ...data,
      tasks: newTasks,
      columns: { ...data.columns, [columnId]: newColumn },
    });
  };

  const deleteTask = (taskId, columnId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newColumn = {
      ...data.columns[columnId],
      taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
    };

    setData({
      ...data,
      tasks: newTasks,
      columns: { ...data.columns, [columnId]: newColumn },
    });
  };

  const renameTask = (taskId, newContent) => {
    const updatedTask = { ...data.tasks[taskId], content: newContent };
    setData({
      ...data,
      tasks: { ...data.tasks, [taskId]: updatedTask },
    });
  };

  return (
    <div style={{ padding: "20px", background: "#111", minHeight: "100vh" }}>
      <button
        onClick={addColumn}
        style={{
          background: "white",
          border: "none",
          padding: "10px 14px",
          borderRadius: "8px",
          color: "black",
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <FaPlus /> Add Column
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                deleteColumn={deleteColumn}
                renameColumn={renameColumn}
                renameTask={renameTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
