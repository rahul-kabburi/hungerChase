import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Add from "../pages/Add/Add";
import List from "../pages/List/List";
import Orders from "../pages/Orders/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Add /> },
      { path: "/add", element: <Add /> },
      { path: "/list", element: <List /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
]);
export default router;
