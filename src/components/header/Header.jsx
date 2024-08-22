import React from "react";
import "./Header.scss";
import { useAuthStore } from "../../lib/authStore.jsx";
import { NearLoginButton } from "../login/NearLoginButton.jsx";
import { Menu } from "../menu/Menu.jsx";
import { EditBar } from "../edit/EditBar.jsx";

export function Header() {
  const authStore = useAuthStore();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  const isOwner = authStore.isAuthenticated();

  return (
    <>
      <div className="root-header-button main-button">
        {authStore.isAuthenticated() ? (
          <button
            className="btn btn-lg btn-outline-primary"
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
                Edit
              </button>
            </div>
          )}
        </>
      )}
      <Menu key="menu" isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
