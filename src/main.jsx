import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import CommingSoon from "./components/CommingSoon";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
      children: [
      {
        path: '',
        element: <Home/>,
      },
      {
        path: '/about',
        element: <About/>,
      },
      {
        path: '/projects',
        element: <Project/>,
      },
      {
        path: '/blog',
        element: <CommingSoon/>,
      },
      {
        path: '/playground',
        element: <CommingSoon/>,
      },

    ]
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
