import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { SERVER_URL, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newServerUrl = SERVER_URL;
    if (currentState === "Login") {
      newServerUrl += "/api/v1/user/login";
    } else {
      newServerUrl += "/api/v1/user/register";
    }

    try {
      const payload =
        currentState === "Login"
          ? { email: data.email, password: data.password }
          : data;

      const response = await axios.post(newServerUrl, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message || "User Login/Signup Failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
      console.error("Login/Register Error →", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-100 transition-all ease-in-out duration-400">
      <ToastContainer />
      <form
        onSubmit={onLogin}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-[90%] max-w-md relative"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-4 mb-4">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-black transition-all duration-300 cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-center gap-2 text-sm mt-4">
          <input type="checkbox" required />
          <p className="text-gray-600">
            By continuing, I agree to the{" "}
            <span className="text-primary font-medium">terms of use</span> &{" "}
            <span className="text-primary font-medium">privacy policy</span>.
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-700">
          {currentState === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              New here?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-primary font-medium cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
