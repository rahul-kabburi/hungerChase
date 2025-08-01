import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <RouterProvider router={router} />
  </StoreContextProvider>
);
