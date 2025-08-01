// src/pages/Error/Error.jsx
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 px-4 py-12">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 text-lg max-w-md mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary hover:bg-black text-white px-6 py-3 rounded-md font-semibold transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
