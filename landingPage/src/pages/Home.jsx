import React from "react";
import Navbar from "../components/Nav";
import Header from "../components/Home/Header";
import Feautures from "../components/Home/Feautures";
import HowItWorks from "../components/Home/HowItWorks";
import Pricing from "../components/Home/Pricing";

const Home = () => {
  return (
    <div className="w-full overflow-y-hidden">
      <Navbar />
      <Header />                  
      <Feautures />
      <HowItWorks />  
      <Pricing/>
    </div>
  );
};

export default Home;
