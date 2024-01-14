import "./style/App.css";
import React, { useState, useEffect } from "react";
import "./style/style.css";
import { Bg } from "./Bg.js";
import { ToastContainer } from "react-toastify";
import { DarkModeToggle } from "./LightDarkMode.js";
import { AddBoardForm } from "./components/AddBoardForm.jsx";
import Board from "./components/Board.jsx";
import Modal from "./components/Modal.js";
function App() {
  let isEmpty = true;
  const [openCardModal, setOpenCardModal] = useState(false);

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
      {openCardModal && (
        <Modal
          setOpenModal={setOpenCardModal}
          action={addTask}
          question={"Please Enter Content of Board!!"}
        >
          <AddBoardForm
            addBoard={addBoard}
            setOpenCardModal={setOpenCardModal}
          />
        </Modal>
      )}
      <h1 className="hero">KanBan Board</h1>
      <DarkModeToggle />
      <div className="kaban">
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
              setTasks={setTasks}
            />
          ))}
        </ul>

        <div
          style={{
            textAlign: "left",
            fontSize: "24px",
            cursor: "pointer",
            padding: "2rem",
          }}
          onClick={() => {
            setOpenCardModal(true);
          }}
        >
          <i className="fa-solid fa-plus"></i> Add Board
        </div>
      </div>

      <Bg isEmpty={isEmpty} />

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
