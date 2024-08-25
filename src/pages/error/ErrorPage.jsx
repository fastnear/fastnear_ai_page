import React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="container-fluid">
        <h1>Oh no</h1>
        <p>An error occurred:</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
}
