import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate("/");
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <footer
      id="contact-us"
      className="bg-black text-white px-6 md:px-20 py-10 my-3"
    >
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-1/3">
          {/* <img
            src={assets.logo_white}
            alt="logo"
            className="h-10 mb-4 cursor-pointer"
            onClick={handleClick}
          /> */}
          <h1 className=" font-bold text-2xl text-orange-400 cursor-pointer">HUNGER CHASE🍴</h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            HungerChasebrings your favorite meals right to your doorstep. Fast,
            reliable, and delicious – we deliver happiness in every bite.
          </p>
          <div className="flex gap-4 mt-4">
            <img
              src={assets.facebook_icon}
              alt="facebook"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src={assets.twitter_icon}
              alt="twitter"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src={assets.linkedin_icon}
              alt="linkedin"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold mb-3">HungerChase</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold mb-3">GET IN TOUCH</h2>
          <ul className="space-y-2 text-gray-300">
            <li>+91-85240 10465</li>
            <li>contact@HungerChase.com</li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />
      <p className="text-center text-sm text-gray-400">
        &copy; 2025 HungerChase.com - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
