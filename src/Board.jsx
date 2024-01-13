import { toast } from "react-toastify";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";
import { useState } from "react";
import Modal from "./Modal";

function Board({ text, tasks, addTask, removeTask, boardId, removeBoard }) {
  const getSuitableArray = (arrayId) => {
    // Find the matching array within the states array
    const matchingState = tasks.filter((state) => state.boardId === arrayId);

    return matchingState ? matchingState : null;
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

  const getTaskByBoardId = getSuitableArray(boardId);
  const handleRemoveBoard = () => {
    removeBoard(boardId);
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

  return (
    <div className="container">
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          action={handleRemoveBoard}
          question={"Are you sure want to delete this board?"}
        />
      )}
      {openCardModal && (
        <Modal
          setOpenModal={setOpenCardModal}
          action={addTask}
          question={"Please Enter Content of Task!!"}
        >
          <AddTaskForm
            addTask={addTask}
            boardId={boardId}
            setOpenCardModal={setOpenCardModal}
          />
        </Modal>
      )}

      <div className="headBoard">
        <div className="titleBoard">
          <p className="truncate">{text}</p>
          <span className="numberTask">{getTaskByBoardId?.length}</span>
        </div>

        <div
          onClick={() => {
            setModalOpen(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
      <ul className="tasks">
        {getTaskByBoardId?.map((task) => (
          <Task key={task.id} task={task} removeTask={removeTask} />
        ))}
      </ul>

      <div
        style={{ textAlign: "left", fontSize: "24px", cursor: "pointer" }}
        onClick={() => {
          setOpenCardModal(true);
        }}
      >
        <i className="fa-solid fa-plus"></i> Add Card
      </div>
    </div>
  );
}

export default Board;
