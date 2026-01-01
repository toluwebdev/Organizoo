import React from "react";
import { assets } from "../assets/assets";

const MainLoader = () => {
  return (
    <div className="w-full h-screen  flex justify-center items-center overflow-hidden">
      <div className="rounded-full loader size-65 flex  justify-center items-center bg-[#373643]"></div>
      <img src={assets.whiteLogo} className="w-35 absolute animate-ping duration-1000" alt="" />
    </div>
  );
};

export default MainLoader;
