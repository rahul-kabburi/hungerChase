import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, token, setToken } = useContext(StoreContext);

  const cartLength = Object.keys(cartItems).length;

  const navItems = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "mobile-app", label: "Mobile App" },
    { id: "contact-us", label: "Contact Us" },
  ];

  useEffect(() => {
    const path =
      location.pathname === "/" ? "home" : location.pathname.replace("/", "");
    setActiveMenu(path);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center bg-white relative z-50">
      {/* Logo */}
      {/* <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-[150px] cursor-pointer"
      /> */}
      <h1 className=" font-bold text-2xl text-orange-400 cursor-pointer">HUNGER CHASE🍴</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 text-gray-700 text-base font-medium">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              to={`/${item.id === "home" ? "" : item.id}`}
              onClick={() => setActiveMenu(item.id)}
              className={`relative cursor-pointer py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-transform after:duration-300 after:ease-in-out after:origin-left ${
                activeMenu === item.id
                  ? "after:w-full after:scale-x-100"
                  : "after:w-full after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-6 relative">
        <div className="relative">
          <img
            onClick={() => navigate("/cart")}
            src={assets.basket_icon}
            alt="basket-icon"
            className="w-6 cursor-pointer hover:scale-105 transition-transform"
          />
          {cartLength > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartLength}
            </span>
          )}
        </div>

        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-1.5 bg-black text-white rounded-md font-semibold hover:bg-primary transition-all duration-300"
          >
            Sign In
          </button>
        ) : (
          <div className="relative">
            <img
              src={assets.profile_icon}
              alt="profile icon"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition"
            />
            {profileOpen && (
              <ul className="absolute right-0 top-12 bg-white border shadow-lg rounded-md py-2 w-40 text-sm z-40">
                <li
                  className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/my-orders");
                    setProfileOpen(false);
                  }}
                >
                  <img src={assets.bag_icon} alt="bag icon" className="w-4" />
                  Orders
                </li>
                <hr className="my-1" />
                <li
                  className="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  <img
                    src={assets.logout_icon}
                    alt="logout icon"
                    className="w-4"
                  />
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <MdOutlineClose className="w-6 h-6" />
        ) : (
          <FiMenu className="w-6 h-6" />
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 py-6 px-6 md:hidden z-40">
          <ul className="flex flex-col gap-4 text-gray-700 text-base">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/${item.id === "home" ? "" : item.id}`}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer ${
                    activeMenu === item.id ? "text-primary font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-4">
            <div className="relative">
              <img
                src={assets.basket_icon}
                alt="basket-icon"
                onClick={() => {
                  navigate("/cart");
                  setMobileMenuOpen(false);
                }}
                className="w-6 cursor-pointer"
              />
              {cartLength > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1 py-0.5 rounded-full">
                  {cartLength}
                </span>
              )}
            </div>

            {token && (
              <button
                onClick={() => {
                  navigate("/my-orders");
                  setMobileMenuOpen(false);
                }}
                className="text-left w-full text-primary font-medium"
              >
                My Orders
              </button>
            )}

            {!token ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-1.5 bg-black text-white rounded-md font-semibold hover:bg-primary transition-all duration-300"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
