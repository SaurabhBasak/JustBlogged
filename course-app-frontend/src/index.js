import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import PostDetail from "./components/Posts/PostDetail";
import ErrorPage from "./components/HomePage/ErrorPage";
import Auth, { action as authAction } from "./components/Authentication/Auth";
import { action as logoutAction } from "./components/Authentication/Logout";
import { checkAuthLoader, tokenLoader } from "./components/Authentication/AuthToken";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Navigate to="posts" replace /> },
      { path: "posts", element: <Homepage /> },
      { path: "posts/:post_id", element: <PostDetail /> },
      { path: "auth", element: <Auth />, action: authAction, loader: checkAuthLoader },
      { path: "logout", action: logoutAction },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
