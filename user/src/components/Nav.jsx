import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { CiDroplet, CiSearch } from "react-icons/ci";
import { CiBrightnessDown } from "react-icons/ci";
import {
  MdArrowDropDown,
  MdArrowDropDownCircle,
  MdBrightnessMedium,
} from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";

import {
  IoIosArrowBack,
  IoIosArrowDropdown,
  IoIosArrowDropdownCircle,
  IoIosNotifications,
} from "react-icons/io";

import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaEnvelope,
  FaCalendar,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import { useState } from "react";

const navlink = [
  {
    icon: <FaTachometerAlt size={20} color="#fff" />,
    name: "Dashboard",
    to: "/",
  },
  {
    icon: <FaCalendarCheck size={20} className="text-white" />,
    name: "Events",
    subLinks: [
      {
        name: "Event Attended",
        to: "/event-attended",
      },
      {
        name: "My Events",
        to: "/event-created",
      },
      {
        name: "All Events",
        to: "/allEvents",
      },
    ],
  },
  {
    icon: <FaUsers size={20} color="#fff" />,
    name: "Peoples",
    to: "/peoples",
  },
  {
    icon: <FaEnvelope size={20} color="#fff" />,
    name: "Messages",
    subLinks: [
      {
        name: "Archive",
        to: "/Archive",
      },
      {
        name: "Inbox",
        to: "/Inbox",
      },
    ],
  },
  {
    icon: <FaCalendarAlt size={20} color="#fff" />,
    name: "Calendar",
    to: "/calendar",
  },
  {
    icon: <FaCog size={20} color="#fff" />,
    name: "Settings",
    subLinks: [
      {
        name: "Profile",
        to: "/profile",
      },
      {
        name: "Payment",
        to: "/payment",
      },
      {
        name: "Notification",
        to: "/notification",
      },
      {
        name: "Wait List",
        to: "/waitList",
      },
    ],
  },
];
const Navi = ({ data, index, setActiveIndex, activeIndex }) => {
  if (data.subLinks) {
    return (
      <li
        onClick={() =>
          setActiveIndex((prev) => (prev === index ? null : index))
        }
        className="h-full group px-2 max-md:w-full  relative flex-1 cursor-pointer list-none"
      >
        <div className="h-full max-md:w-full text-white gap-3 max-md:flex-row min-h-20 max-md:min-h-15 flex flex-row items-center max-md:justify-start justify-center">
          <div className="max-md:flex-row max-md:gap-3 max-md:w-full flex max-md:justify-start flex-col justify-center items-center">
            {data.icon}
            {data.name}
          </div>
          <div
            className={` duration-500 ${
              activeIndex === index ? "rotate-90" : "rotate-270"
            }`}
          >
            <IoIosArrowBack />
          </div>
        </div>

        <ul className="md:absolute  duration-500 w-full static top-20 bg-[#18212C]">
          <div
            className={`h-0 w-full overflow-hidden ${
              activeIndex === index ? "h-[100%]" : "h-0"
            }`}
          >
            {data.subLinks.map((e) => (
              <li className="w-full block">
                {
                  <NavLink
                    className="w-full max-md:gap-3 px-2 block  py-3"
                    to={e.to}
                  >
                    {e.name}
                  </NavLink>
                }
              </li>
            ))}
          </div>
        </ul>
      </li>
    );
  }
  return (
    <li
      onClick={() => setActiveIndex(null)}
      className="h-full max-md:w-full flex-1 list-none"
    >
      <NavLink
        to={data.to}
        className="h-full max-md:w-full max-md:justify-start px-2 max-md:flex-row min-h-20 max-md:min-h-15 flex flex-col items-center max-md:gap-3 justify-center"
      >
        {data.icon}
        {data.name}
      </NavLink>
    </li>
  );
};
const Nav = () => {
  const { isLogin, userData, logout, mode, setMode, color } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenu, setShowMobileMenu] = useState(false);
  console.log(userData);
  const handlerTheme = () => {
    setMode((prev) => !prev);
  };

  return (
    <nav className={`bg-[${color.backGround}]`}>
      {/* Logo */}
      <div
        className={`min-h-20 max-md:py-2 flex-wrap gap-2 mx-auto max-w-6xl  flex justify-between items-center px-4 `}
      >
        <Link to="/">
          {!mode ? (
            <img src={assets.blackLogo} className="h-10" alt="" />
          ) : (
            <img src={assets.whiteLogo} className="h-10" alt="" />
          )}
        </Link>
        {/* Search */}
        <div className="flex flex-nowrap max-md:order-1 max-md:w-full gap-2 h-full items-center justify-center">
          {" "}
          <div
            className={`flex gap-2 p-2 min-w-xs max-md:min-w-0 max-md:h-12  flex-1  max-w-full items-center h-20  bg-[${color.inputContainer}] `}
          >
            <CiSearch size={24} className="text-gray-400" />
            <input
              type="text"
              className="outline-none flex-1 text-black border-none"
              placeholder="Search"
            />
          </div>
          <button
            className={`
              bg-[${color.primaryColor}]
           transition duration-500 p-3 max-md:px-3  rounded-md px-7 font-medium text-white`}
          >
            Create New Event
          </button>
        </div>
        {/* Is Login Logic */}
        {isLogin ? (
          <div className="flex  items-center max-md:gap-1 gap-3">
            <span
              className={` text-${color.textColor}  max-md:hidden transition duration-500`}
            >
              <b className="font-medium">REVENUE:</b> $20000
            </span>
            <div className="flex gap-10 justify-center items-center">
              <div className="group relative">
                <img
                  src={userData.imageUrl ? userData.imageUrl : ""}
                  className="size-10 cursor-pointer rounded-full"
                  alt="Profile"
                />
                <ul
                  className={`absolute right-0   min-w-[200px] z-40 hidden group-hover:block rounded-lg overflow-hidden shadow-xl text-${color.textColor} bg-[${color.backGround}]`}
                >
                  {[
                    { name: "My Profile", link: "/profile" },
                    { name: "Notifications", link: "/notifications" },
                    { name: "Event Created", link: "/eventcreated" },
                    { name: "Event Attended", link: "/eventAttended" },
                    { name: "Elements", link: "/Elements" },
                  ].map((e) => (
                    <li className="hover:bg-gray-500/30 cursor-pointer px-4 py-2">
                      <Link to={e.link} className="block ">
                        {e.name}
                      </Link>
                    </li>
                  ))}
                  <li
                    onClick={logout}
                    className="hover:bg-gray-500/30  text-red-500 cursor-pointer px-4 py-2"
                  >
                    Log Out
                  </li>
                </ul>
              </div>
              <div className="gap-3 flex justify-center items-center">
                {mode ? (
                  <CiBrightnessDown
                    size={20}
                    className={`transition ${
                      mode ? "text-white" : "text-gray-400"
                    }  cursor-pointer duration-700`}
                    onClick={() => handlerTheme()}
                  />
                ) : (
                  <MdBrightnessMedium
                    size={20}
                    className={`transition cursor-pointer  duration-700`}
                    onClick={() => handlerTheme()}
                  />
                )}
                <div className="flex justify-center items-center relative">
                  <IoIosNotifications
                    className={`transition ${
                      !mode ? "text-black" : "text-white"
                    }  cursor-pointer duration-500`}
                    size={25}
                  />
                  <div className="absolute bg-red-600 rounded-full flex text-xs size-4 -right-0.5 text-center justify-center items-center -top-1 text-white">
                    4
                  </div>
                </div>
                <RiMenu3Fill
                  onClick={() => setShowMobileMenu((prev) => !prev)}
                  className={`md:hidden block text-${color.textColor}`}
                  size={25}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-[#0B8F76] transition duration-500 p-2 rounded-full px-7 font-medium text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#0B8F76] transition duration-500 p-2 rounded-full px-7 font-medium text-white"
            >
              Register
            </Link>
            <div className="gap-3 flex justify-center items-center">
              {mode ? (
                <CiBrightnessDown
                  size={25}
                  className={`transition ${
                    mode ? "text-white" : "text-gray-400"
                  }  cursor-pointer duration-700`}
                  onClick={() => handlerTheme()}
                />
              ) : (
                <MdBrightnessMedium
                  size={25}
                  className={`transition cursor-pointer  duration-700`}
                  onClick={() => handlerTheme()}
                />
              )}
              <div className="relative flex justify-center items-center">
                <IoIosNotifications
                  className={`transition ${
                    !mode ? "text-black" : "text-white"
                  }  cursor-pointer duration-500`}
                  size={25}
                />
                <RiMenu3Fill
                  onClick={() => setShowMobileMenu((prev) => !prev)}
                  className={`md:hidden block text-${color.textColor}`}
                  size={25}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Menu */}
      <div
        className={`w-full lan ${mobileMenu ? "max-md:h-full max-md:min-h-0" : "max-md:h-0 max-md:min-h-0 max-md:overflow-hidden"}  min-h-20 h-full bg-[#18212C]`}
      >
        <div className=" mx-auto h-full max-w-6xl flex flex-wrap max-md:flex-col justify-between items-center ">
          {navlink.map((e, index) => (
            <Navi
              data={e}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            ></Navi>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Nav;
