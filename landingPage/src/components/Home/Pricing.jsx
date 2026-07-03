import React from "react";
import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <div className=" mb-10 max-w-4xl mx-auto mt-20">
      <h1 className="font-primary  mt-2 text-2xl font-semibold text-center max-w-3xl mx-auto mb-20 tracking-tight text-[#110111] sm:mt-3 sm:text-3xl lg:text-5xl">
        Simple Plans for Every Organizer
      </h1>
      <div className="flex flex-row flex-wrap max-sm:flex-col p-5 text-white  gap-5">
        <PricingCard
          title="Premium ✨"
          description="Unlimited events, Ticketing & payments, Advanced notifications,
            Analytics dashboard "
          price={"$9.99"}
          color="#110111"
          features={[
            "Unlimited Events",
            "Ticketing & payments",
            "Advanced notifications",
            "Analytics dashboard",
          ]}
        />
        <div className="flex-1 flex flex-col gap-4 shadow-lg rounded-xl  p-6 bg-[#110111]  min-h-[550px]">
          <h1 className="text-2xl font-primary tracking-tight text-white font-semibold"></h1>
          <p></p>
          <h1 className="text-2xl font-primary trracking-tight text-white font-semibold">
            <span className="text-sm font-medium">/ month</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
