import { assets } from "../../assets/assets";
import { HiMenu } from "react-icons/hi";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center px-4 md:px-6 py-3 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl text-gray-700"
        >
          <HiMenu />
        </button>

        <div className="flex flex-col items-start">
          <img src={assets.logo} alt="logo" className="h-8 sm:h-10 w-auto" />
          <span className="text-xs text-gray-600 mt-1 font-medium">
            Admin Panel
          </span>
        </div>
      </div>

      <div>
        <img
          src={assets.profile_image}
          alt="profile"
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-gray-300"
        />
      </div>
    </div>
  );
};

export default Navbar;
