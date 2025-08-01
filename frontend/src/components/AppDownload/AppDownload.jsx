import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div id="mobile-app" className="bg-black text-white px-6 py-10 md:px-20 my-25 flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl shadow-md">
      <p className="text-center md:text-left text-xl md:text-2xl font-semibold leading-relaxed">
        For a Better Experience, <br />
        <span className="text-primary">Download the HungerChaseApp</span>
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <a
          href="https://play.google.com/store/apps?hl=en_IN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={assets.play_store}
            alt="play store"
            className="w-36 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </a>
        <a
          href="https://www.apple.com/in/app-store/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={assets.app_store}
            alt="app store"
            className="w-36 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>

    </div>
  );
};

export default AppDownload;
