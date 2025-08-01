import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const linkClasses =
    "flex items-center gap-3 px-4 py-3 hover:bg-gray-200 rounded-md transition-colors";
  const activeClass = "bg-gray-300 font-semibold";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed md:static z-50 w-64 bg-white shadow-md p-4 min-h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-end md:hidden mb-4">
          <button onClick={closeSidebar} className="text-2xl">
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeClass : ""}`
            }
            onClick={closeSidebar}
          >
            <img src={assets.add_icon} alt="add" className="h-6 w-6" />
            <p>Add Items</p>
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeClass : ""}`
            }
            onClick={closeSidebar}
          >
            <img src={assets.order_icon} alt="list" className="h-6 w-6" />
            <p>List Items</p>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeClass : ""}`
            }
            onClick={closeSidebar}
          >
            <img src={assets.order_icon} alt="orders" className="h-6 w-6" />
            <p>Orders</p>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
