import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-smooth">
        <Navbar setShowLogin={setShowLogin} />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
