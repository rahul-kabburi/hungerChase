import React from "react";
import AppDownload from "../../components/AppDownload/AppDownload";


const MobileApp = () => {
  return (
    <div className="py-10 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Get the HungerChaseApp
      </h1>
      <AppDownload />
    </div>
  );
};

export default MobileApp;
