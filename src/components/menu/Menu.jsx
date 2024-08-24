import React from "react";
import "./Menu.scss";
import { useAuthStore } from "../../lib/authStore.jsx";

export function Menu(props) {
  const authStore = useAuthStore();

  return (
    <div className={`root-menu ${props.isOpen ? "" : "visually-hidden"}`}>
      <button
        className="btn btn-outline-secondary close-button"
        onClick={props.onClose}
      >
        Close
      </button>

      <button
        className="btn btn-outline-danger"
        onClick={() => {
          authStore.clearAuth();
        }}
      >
        Log out
      </button>
    </div>
  );
}
