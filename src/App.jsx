import "./App.css";
import React, { useState, useEffect } from "react";
import "./style.css";
import { Bg } from "./Bg.js";
import { ToastContainer } from "react-toastify";
import { DarkModeToggle } from "./LightDarkMode.js";
import { AddBoardForm } from "./AddBoardForm.jsx";
import Board from "./Board.jsx";
function App() {
  let isEmpty = true;
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("boards")) || []
  );
  //set tasks for the first-time
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  window.localStorage.setItem("boards", JSON.stringify(boards));

  //get item
  useEffect(() => {
    const tasks = window.localStorage.getItem("tasks");
    const boards = window.localStorage.getItem("boards");

    if (tasks !== null) setTasks(JSON.parse(tasks));
    if (boards !== null) setBoards(JSON.parse(boards));
  }, []);
  //set item
  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    window.localStorage.setItem("boards", JSON.stringify(boards));
  }, [tasks, boards]);
  const addBoard = (task) => {
    setBoards((prev) => [...prev, task]);
  };
  const removeBoard = (id) => {
    setBoards((boards) => boards.filter((t) => t.id !== id));
    setTasks((tasks) => tasks.filter((t) => t.boardId !== id));
  };
  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };
  const removeTask = (id) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };
  if (tasks.length) {
    isEmpty = false;
  } else {
    isEmpty = true;
  }

  return (
    <div className="App">
      <main>
        <h1 className="hero">KanBan Board</h1>
        <DarkModeToggle />
        <AddBoardForm addBoard={addBoard} />
        <ul className="boards">
          {boards.map((el, id) => (
            <Board
              key={id}
              text={el.text}
              boardId={el.id}
              tasks={tasks}
              addTask={addTask}
              removeTask={removeTask}
              removeBoard={removeBoard}
            />
          ))}
        </ul>

        <Bg isEmpty={isEmpty} />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
