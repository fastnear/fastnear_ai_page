import React from "react";
import "./Menu.scss";
import { useAuthStore } from "../../lib/authStore.jsx";
import { usePageContent } from "../../hooks/pageContent.jsx";

export function Menu(props) {
  const authStore = useAuthStore();
  const [content] = usePageContent();

  return (
    <div className={`root-menu ${props.isOpen ? "" : "visually-hidden"}`}>
      <button
        className="btn btn-outline-secondary close-button"
        onClick={props.onClose}
      >
        X
      </button>

      <div className="account-id">{authStore.accountId()}</div>
      <div className="mt-3">
        <p>Sorry but you can't share or store the page content yet.</p>
        <p>
          This is a demo app and the content is stored in your local memory.
        </p>
        <p>
          Feel free to make screenshots or copy the content to your clipboard.
        </p>
        <button
          className="btn btn-outline-dark"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          Copy to clipboard
        </button>
      </div>

      <button
        className="btn btn-outline-danger sign-out-button"
        onClick={() => {
          authStore.clearAuth();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
