import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const route = useNavigate();
  return (
    <div className="flex justify-center flex-col items-center min-h-[70vh]">
      <img src="/notfound.png" className="max-w-full w-[700px]" alt="" />
      <h1 className="text-4xl font-bold text-[#0B8F76]">Page Not Found</h1>
      <button onClick={() => route("/")} className="cursor-pointer px-5 text-white rounded-full mt-4 py-3 bg-[#0B8F76]">Back to Home</button>
    </div>
  );
};

export default Notfound;
