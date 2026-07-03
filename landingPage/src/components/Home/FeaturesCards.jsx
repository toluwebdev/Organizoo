import React from "react";
import { images } from "../../assets/data";
import GlobalButton from "../GlobalButton";
import { motion } from "framer-motion";

const FeaturesCards = ({ index, title, image, description, buttonText }) => {
  return (
    <motion.div
      initial={{ opacity: 0,  y:   60 , x: index % 2 === 0?-30: 30 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      className="w-full flex gap-10 max-sm:gap-5 max-md:flex-col flex-row justify-center flex-wrap "
    >
      {/* Image */}
      <div
        className={` relative mx-auto max-w-full ${index % 2 === 0 ? "md:order-1" : ""}  h-87.5 w-100 `}
      >
              <h1 className={`absolute text-4xl -top-5 ${index % 2 === 0 ? "md:-right-5 " : "md:-left-5 "}  max-md:-left-5  tracking-tighter max-sm:-left-3 font-extrabold font-secondary`}>
          {index / 10 < 1 ? `0${index}` : index}
        </h1>
        <div className="w-full h-full overflow-hidden rounded-md">
          <img
            src={image}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
      {/* Text */}
      <div className="flex-1 ">
        <h1 className="font-primary mt-2 text-2xl font-semibold  tracking-tight text-[#110111] sm:mt-3 sm:text-3xl lg:text-3xl">
          {title}
        </h1>
        <p className=" tracking-tight leading-6 mt-1 mb-3 max-sm:leading-5 text-sm font-primary">
          {description}
        </p>
        <GlobalButton text={buttonText} />
      </div>
    </motion.div>
  );
};

export default FeaturesCards;
