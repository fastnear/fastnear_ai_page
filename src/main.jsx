import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import * as bootstrap from "bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./pages/index/IndexPage.jsx";
import { ErrorPage } from "./pages/error/ErrorPage.jsx";
import { RootWrapper } from "./navigation/RootWrapper.jsx";
import { AccountPage } from "./pages/account/AccountPage.jsx";
import { Page } from "./pages/page/Page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/:accountId",
        element: <AccountPage />,
      },
      {
        path: "/:accountId/:pageId",
        element: <Page />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
