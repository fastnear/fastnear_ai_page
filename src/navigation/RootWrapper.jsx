import React from "react";
import { Header } from "../components/header/Header.jsx";
import { Outlet } from "react-router-dom";

export function RootWrapper() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Outlet />
      </div>
    </>
  );
}
