import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import Menu from "../pages/Menu/Menu";
import ProtectedRoute from "./ProtectedRoute";
import MyOrders from "../pages/MyOrders/MyOrders";
import MobileApp from "../pages/MobileApp/MobileApp";
import ContactUs from "../pages/ContactUs/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      { path: "/mobile-app", element: <MobileApp /> },
      { path: "/contact-us", element: <ContactUs /> },
    ],
  },
]);

export default router;
