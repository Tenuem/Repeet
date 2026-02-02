import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Explore from "../Pages/Explore";
import Revisions from "../Pages/Revisions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <div>Home</div>},
      { path: "explore", element: <Explore />},
      { path: "revisions", element: <Revisions /> },
      //{ path: "sets", element: <SetDetails /> },
    ]
  }])