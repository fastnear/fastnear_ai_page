import React from "react";
import { Header } from "../components/header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useHandleLogin } from "../hooks/login.jsx";

export function RootWrapper() {
  useHandleLogin();
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Outlet />
      </div>
    </>
  );
}
