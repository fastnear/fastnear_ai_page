import React from "react";
import "./Header.scss";
import { useAuthStore } from "../../lib/authStore.jsx";
import { NearLoginButton } from "../login/NearLoginButton.jsx";
import { Menu } from "../menu/Menu.jsx";
import { EditBar } from "../edit/EditBar.jsx";
import { useParams } from "react-router-dom";

export function Header() {
  const { accountId, pageId } = useParams();

  const authStore = useAuthStore();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(true);

  const isOwner =
    authStore.isAuthenticated() && authStore.accountId() === accountId;

  return (
    <>
      <div className="root-header-button main-button">
        {authStore.isAuthenticated() ? (
          <button
            className="btn btn-lg btn-outline-secondary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {authStore.accountId().substring(0, 2).toUpperCase()}
          </button>
        ) : (
          <NearLoginButton />
        )}
      </div>
      {isOwner && (
        <>
          <EditBar
            key="edit-bar"
            isOpen={editOpen}
            onClose={() => setEditOpen(false)}
          />
          {!editOpen && (
            <div key="edit-button" className="root-header-button edit-button">
              <button
                className="btn btn-lg btn-outline-primary"
                onClick={() => setEditOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-fill align-baseline"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      <Menu key="menu" isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
