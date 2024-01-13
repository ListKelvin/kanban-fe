import React from "react";
import "./Modal.css";

export default function Modal({ setOpenModal, action, question, children }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>{question}</h1>
        </div>

        <div className="body">{children}</div>

        {!children && (
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenModal(false);
                action();
              }}
            >
              Yes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
