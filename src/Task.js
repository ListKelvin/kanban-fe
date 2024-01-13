import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
export function Task(props) {
  const { task, removeTask } = props;
  const handleRemoveClick = () => {
    removeTask(task.id);
    toast.error("Remove Done! ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleClearClick = () => {
    removeTask(task.id);
    toast.success("🦄 Done!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEditTask = () => {
    setOpenEditModal(true);
  };
  console.log(openEditModal);
  return (
    <li className="task">
      {openEditModal && (
        <Modal
          setOpenModal={setOpenEditModal}
          question={"Please Enter Content of Task!!"}
        >
          <form>
            <input value={task.text} />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          action={handleRemoveClick}
          question={"Are you sure want to delete this task?"}
        />
      )}

      <div>
        <div className="text">{task.text}</div>
        <div>list of tags here</div>
      </div>

      <div>
        <button
          aria-label="Remove Task"
          className="remove-btn "
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}
