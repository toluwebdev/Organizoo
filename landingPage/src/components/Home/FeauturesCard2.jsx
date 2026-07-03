import React from "react";
import {motion} from "framer-motion"
const FeauturesCard2 = ({ img, text, description, index }) => {
  return (
    <motion.div
    initial={{ opacity: 0,  y:60  }}
      transition={{ duration: 1, delay: index * 0.2 }}
      whileInView={{ opacity: 1, y: 0}}
      viewport={{ once: true }}
      className="w-full min-h-90 p-3 bg-gray-100 rounded-lg flex flex-col gap-2">
      <h1 className="font-primary  text-lg font-semibold  tracking-tight text-[#110111]  ">
        {text}
      </h1>
      <img
        src={img}
        className="flex-1 w-full object-cover h-full object-center rounded-md"
      />
      <p className="text-[13px] font-primary  leading-4 tracking-tight text-gray-700">
       {description}
      </p>
    </motion.div>
  );
};

export default FeauturesCard2;
