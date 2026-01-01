import React from "react";
import Nav from "../components/Nav";
import { assets } from "../assets/assets";
import WhatWeOfferCard from "../components/WhatweofferCard";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="flex max-w-[1300px] flex-wrap py-20 max-sm:gap-5 items-center justify-between mx-auto px-5">
        <div>
          <h1 className=" text-7xl max-sm:text-3xl  font-sans  text-[#3A3946] font-bold ">
            Track <span className="text-secondary-dark"> Your </span> <br />
            Events <span className="text-secondary-dark">Seemlessly</span>
          </h1>
          <p className="max-w-[600px] text-text-light text-[15px] tracking-tight leading-6 my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            perspiciatis officiis quasi necessitatibus beatae autem fuga tenetur
            sint delectus illo ab Lorem ipsum dolor sit amet consectetur
            adipisicing
          </p>
          <div className="flex gap-3  items-center">
            <Link
              to="/signup"
              className="py-3 px-10   rounded-full duration-1000 hover:bg-transparent hover:border-1 hover:text-secondary-dark bg-secondary-dark text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
        <img className="w-full max-w-[600px]" src={assets.homeImage} alt="" />
      </div>
      {/* What we offer  */}
      <div className="w-full max-w-[1300px] px-5  mx-auto">
        <h2 className="text-2xl text-center text-[#3A3946]  mt-10 font-bold">What We Offer</h2>
        <WhatWeOfferCard></WhatWeOfferCard>
      </div>
    </div>
  );
};

export default Home;
