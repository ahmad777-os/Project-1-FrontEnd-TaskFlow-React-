// src/App.jsx
import React from "react";
import Board from "./components/Board";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>TaskFlow</h1>
      </header>
      <Board />
    </div>
  );
};

export default App;
