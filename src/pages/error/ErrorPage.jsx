import React from "react";
import { useRouteError } from "react-router-dom";
import { Header } from "../../components/header/Header.jsx";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <h1>Oh no</h1>
        <p>Page not found</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
}
