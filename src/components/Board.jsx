import { toast } from "react-toastify";
import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";
import { useState } from "react";
import Modal from "./Modal";

function Board({
  text,
  tasks,
  addTask,
  removeTask,
  boardId,
  removeBoard,
  setTasks,
}) {
  const getSuitableArray = (arrayId) => {
    // Find the matching array within the states array
    const matchingState = tasks.filter((state) => state.boardId === arrayId);

    return matchingState ? matchingState : null;
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTask, setEditTask] = useState("");
  // const [editText, setEditText] = useState("");

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
  const handleEditTask = (task) => {
    setOpenEditModal(true);
    setEditTask(task);
  };
  const updateTodo = (e) => {
    e.preventDefault();

    const todo = getTaskByBoardId?.find((todo) => todo.id === editTask.id);
    const updatedTodo = { ...todo, text: editTask.text };
    setTasks(
      tasks?.map((t) =>
        t.id === todo.id && t.boardId === todo.boardId ? updatedTodo : t
      )
    );
    setOpenEditModal(false);
  };

  const handleChange = (e) => {
    setEditTask({ ...editTask, text: e.target.value });
  };
  return (
    <div className="container">
      {openEditModal && (
        <Modal
          setOpenModal={setOpenEditModal}
          question={"You can edit this task"}
        >
          <form className="add-task-form" onSubmit={updateTodo}>
            <input value={editTask.text} onChange={handleChange} type="text" />
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
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
          <Task
            key={task.id}
            task={task}
            removeTask={removeTask}
            handleEditTask={handleEditTask}
          />
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
