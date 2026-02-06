import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Explore from "../Pages/Explore";
import Revisions from "../Pages/Revisions";
import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <div>Home</div>},
      { path: "explore", element: <Explore />},
      { path: "revisions", element: <ProtectedRoute><Revisions /></ProtectedRoute> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "games", element: <div>We are currently working on the new features for you!</div> },
    ]
  }])