import "./IndexPage.scss";
import { NearLoginButton } from "../../components/login/NearLoginButton.jsx";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../lib/authStore.jsx";

export function IndexPage(props) {
  const authStore = useAuthStore();
  return (
    <div className="page-center">
      <div>
        <h1 className="mb-5">FAST NEAR AI DEMO</h1>
        {authStore.isAuthenticated() ? (
          <div>
            <h3>Welcome, {authStore.accountId()}!</h3>
            <Link
              className="btn btn-primary btn-lg"
              to={`/${authStore.accountId()}/new`}
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div>
            <h3>Sign in to get started</h3>
            <NearLoginButton />
          </div>
        )}
      </div>
    </div>
  );
}
