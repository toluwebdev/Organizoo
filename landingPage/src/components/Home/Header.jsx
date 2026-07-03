import React from 'react'
import { images } from '../../assets/data'
import { motion } from "framer-motion";
const Header = () => {
  return (
    <div className="max-h-screen max-sm:h-[60vh] relative overflow-hidden gap-3  px-3 flex flex-col items-center  ">
        <img
          src={images.bg}
          className="w-full h-[120vh] max-sm:h-[70vh]  object-cover object-bottom -z-1 absolute "
        />
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-primary max-w-4xl mt-[20vh] bg-linear-to-r from-[#FFFFFF] to-[#1101114d] bg-clip-text py-2 text-center text-[29px] leading-11 font-semibold tracking-[-1.6px] text-transparent md:text-[74px] md:leading-20"
        >
          Organize. Discover. Connect
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm max-w-md mb-10 text-white"
        >
          OrganizO is your all-in-one platform for creating, managing, and
          discovering events — with a social twist
        </motion.p>
        <motion.div
          initial={{ opacity:0, y:100}}
          transition={{ duration: 1, delay: 0.4 }}
          whileInView={{ opacity:1, y:0}}
          viewport={{ once: true }}
          className=" max-w-[80%] w-6xl px-3  -bottom-80 overflow-hidden"
        >
          <img
            src={images.dashboardImage}
            className=" w-full rounded-2xl object-cover object-top"
            alt=""
          />
        </motion.div>
      </div>
  )
}

export default Header