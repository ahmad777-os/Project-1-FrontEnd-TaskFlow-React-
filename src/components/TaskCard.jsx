import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { FaTrash, FaEdit } from "react-icons/fa";

const TaskCard = ({ task, index, deleteTask, renameTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.content);

  const handleRename = () => {
    renameTask(task.id, content);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "8px",
            background: snapshot.isDragging ? "#3b82f6" : "rgba(255,255,255,0.15)",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: snapshot.isDragging ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
            ...provided.draggableProps.style,
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleRename}
              autoFocus
              style={{
                flex: 1,
                marginRight: "10px",
                padding: "4px 6px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
              }}
            />
          ) : (
            <span>{task.content}</span>
          )}
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <FaEdit />
            </button>
            <button
              onClick={deleteTask}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
