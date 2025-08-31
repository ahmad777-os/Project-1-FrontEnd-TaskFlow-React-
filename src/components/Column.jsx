import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

const Column = ({ column, tasks, addTask, deleteTask, deleteColumn, renameColumn, renameTask }) => {
  const [newTask, setNewTask] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(column.id, newTask);
      setNewTask("");
    }
  };

  const handleRenameColumn = () => {
    renameColumn(column.id, title);
    setIsEditingTitle(false);
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(14px)",
        borderRadius: "18px",
        padding: "15px",
        minWidth: "280px",
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        margin: "0 10px",
        position: "relative",
      }}
    >
      {/* Column Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleRenameColumn}
            autoFocus
            style={{
              width: "100%",
              fontSize: "18px",
              padding: "5px 8px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          />
        ) : (
          <h2 style={{ color: "#fff", margin: 0 }}>{column.title}</h2>
        )}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#fff" }}
            onClick={() => setIsEditingTitle(true)}
          >
            <FaEdit />
          </button>
          <button
            style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#fff" }}
            onClick={() => deleteColumn(column.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Task List */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              minHeight: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "4px",
              borderRadius: "8px",
              background: snapshot.isDraggingOver ? "rgba(255,255,255,0.1)" : "transparent",
              transition: "background 0.2s ease",
              overflow: "visible",
            }}
          >
            {tasks.length === 0 && <div style={{ padding: "20px", color: "#aaa", textAlign: "center" }}>Drop tasks here</div>}
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                deleteTask={() => deleteTask(task.id, column.id)}
                renameTask={renameTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Task */}
      <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            fontSize: "14px",
          }}
        />
        <button
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleAddTask}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Column;
