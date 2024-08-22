import React from "react";
import "./Menu.scss";

export function Menu(props) {
  return (
    <div className={`root-menu ${props.isOpen ? "" : "visually-hidden"}`}>
      <button
        className="btn btn-outline-secondary close-button"
        onClick={props.onClose}
      >
        Close
      </button>
    </div>
  );
}
