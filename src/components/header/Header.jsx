import React from "react";
import "./Header.scss";
import { useAuthStore } from "../../lib/authStore.jsx";
import { NearLoginButton } from "../login/NearLoginButton.jsx";
import { Menu } from "../menu/Menu.jsx";

export function Header() {
  const authStore = useAuthStore();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <div className="root-header">
        {authStore.isAuthenticated() ? (
          <button
            className="btn btn-lg btn-outline-primary"
            onClick={() => setMenuOpen(true)}
          >
            {authStore.accountId().substring(0, 1).toUpperCase()}
          </button>
        ) : (
          <NearLoginButton />
        )}
      </div>
      {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
