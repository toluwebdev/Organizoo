import React from "react";
import { images } from "../../assets/data";
import { motion } from "framer-motion";
const HowItWorks = () => {
  return (
    <div className="min-h-30vh py-10 mb-10 mt-20 bg-[#110111]">
      <div className="max-w-5xl px-3   mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-primary mt-2 text-2xl font-semibold text-center max-w-3xl mx-auto mb-10 tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-5xl"
        >
          Get Started In Three Simple Steps
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl flex shadow-[0_16px_40px_rgba(15,23,42,0.45)] justify-center items-center rounded-xl relative overflow-hidden mx-auto"
        >
          <img src={images.event1} className="w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <button className=" absolute group inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/10 ring-2 ring-[#110111]/70 backdrop-blur-md transition hover:scale-105 hover:bg-white/15 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <span className="absolute inset-0 rounded-full bg-indigo-500/70 opacity-60 blur-3xl group-hover:opacity-80" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
