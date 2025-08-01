import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 bg-gray-100">
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
