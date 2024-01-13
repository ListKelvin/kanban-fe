import React, { useState } from "react";
import { toast } from "react-toastify";
// id function
let id = 0;
const generateId = () => {
  const res = id;
  id++;
  return res;
};
export function AddTaskForm({ addTask, boardId, setOpenCardModal }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length) {
      addTask({
        id: generateId(),
        text,
        boardId: boardId,
      });
      setText("");
      setOpenCardModal(false);
    } else {
      toast.info("Please Enter something!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        type="text"
        id="input"
        arial-label="Name things you want to do "
        placeholder="Name things you want to do "
        value={text}
        onChange={handleChange}
      ></input>
      <input className="submit-btn" type="submit" value="Add Task"></input>
    </form>
  );
}
