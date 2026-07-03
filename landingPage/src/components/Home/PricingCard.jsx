import React from "react";

const PricingCard = ({ title, description, price, features, color }) => {
  return (
    <div
      className={`flex-1 flex flex-col justify-between gap-4 shadow-lg rounded-xl  p-6  bg-[${color}]  min-h-[550px]`}
    >
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-primary tracking-tight text-white font-semibold">
          {title}
        </h1>
        <p>{description}</p>
        <h1 className="text-2xl font-primary trracking-tight text-white font-semibold">
          {price}
          <span className="text-sm font-medium">/ month</span>
        </h1>
        <ul className="list-disc px-5">
         
          {features?.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      </div>
      <button className="bg-white px-2 py-3 text-[#342734] font-primary font-medium roumded-md cursor-pointer">
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
