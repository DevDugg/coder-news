import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
