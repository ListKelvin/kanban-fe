import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
export function Task(props) {
  const { task, removeTask, handleEditTask } = props;
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

  // const handleClearClick = () => {
  //   removeTask(task.id);
  //   toast.success("🦄 Done!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <li className="task">
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          action={handleRemoveClick}
          question={"Are you sure want to delete this task?"}
        />
      )}
      <div
        onClick={() => handleEditTask(task)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <div>
          <div className="text">{task.text}</div>
          <div>list of tags here</div>
        </div>

        <div>
          <button
            aria-label="Remove Task"
            className="remove-btn "
            onClick={(e) => {
              e.stopPropagation(); // prevent
              setModalOpen(true);
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </li>
  );
}
