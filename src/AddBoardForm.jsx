import React, { useState } from "react";
import { toast } from "react-toastify";
// id function
let id = 0;
const generateId = () => {
  const res = id;
  id++;
  return res;
};
export function AddBoardForm({ addBoard, setOpenCardModal }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length !== 0) {
      addBoard({
        id: generateId(),
        text: text.trim(),
        // listTasks: [],
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
        arial-label="Name Your Board "
        placeholder="Name Your Board "
        value={text}
        onChange={handleChange}
      ></input>
      <input className="submit-btn" type="submit" value="Add Board"></input>
    </form>
  );
}
