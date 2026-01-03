import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { CiSearch } from "react-icons/ci";
import { CiBrightnessDown } from "react-icons/ci";
import { MdBrightnessMedium } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaEnvelope,
  FaCalendar,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";

const Nav = () => {
  const { isLogin, userData, logout, mode, color, setMode } = useAppContext();
  console.log(userData);

  return (
    <nav
      style={{
        backgroundColor: color.backGround,
      }}
    >
      <div
        className={`h-20 flex-wrap gap-2 mx-auto max-w-6xl  flex justify-between items-center px-4 `}
      >
        <Link to="/">
          {!mode ? (
            <img src={assets.blackLogo} className="h-10" alt="" />
          ) : (
            <img src={assets.whiteLogo} className="h-10" alt="" />
          )}
        </Link>

        <div className="flex flex-wrap max-md:order-1  gap-2 h-full items-center justify-center">
          {" "}
          <div
            className={`flex gap-2 p-2 w-xs max-[980px]:w-50 max-w-full items-center h-full  ${
              !mode ? "bg-[#F9F9F9]" : "bg-[#F9F9F9]/35"
            } `}
          >
            <CiSearch size={24} className="text-gray-400" />
            <input
              type="text"
              className="outline-none flex-1 text-black border-none"
              placeholder="Search"
            />
          </div>
          <button
            className={`bg-[${color.primaryColor}] transition duration-500 p-3 rounded-md px-7 font-medium text-white`}
          >
            Create New Event
          </button>
        </div>

        {isLogin ? (
          <div className="flex items-center gap-3">
            <span
              className={`text-${color.textColor} max-md:hidden transition duration-500`}
            >
              <b className="font-medium">REVENUE:</b> $20000
            </span>
            <div className="flex gap-10 justify-center items-center">
              <div className="group relative">
                {userData.imageUrl ? (
                  <img
                    src={userData?.imageUrl}
                    className="size-10 cursor-pointer rounded-full"
                    alt="Profile"
                  />
                ) : (
                  <img
                    src={userData?.imageUrl}
                    className="size-10 cursor-pointer rounded-full"
                    alt="Profile"
                  />
                )}
                <ul
                  className={`absolute right-0   min-w-[200px] hidden group-hover:block rounded-lg overflow-hidden shadow-xl ${
                    !mode ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  <li className="hover:bg-gray-500/30  cursor-pointer px-4 py-2">
                    <Link to="/profile" className="block ">
                      My Profile
                    </Link>
                  </li>
                  <li className="hover:bg-gray-500/30 cursor-pointer px-4 py-2">
                    <Link to="/notifications" className="block ">
                      Notifications
                    </Link>
                  </li>
                  <li className="hover:bg-gray-500/30 cursor-pointer px-4 py-2">
                    <Link to="/eventcreated" className="block ">
                      Event Created
                    </Link>
                  </li>
                  <li className="hover:bg-gray-500/30 cursor-pointer px-4 py-2">
                    <Link to="/eventAttended" className="block ">
                      Event Attended
                    </Link>
                  </li>
                  <li className="hover:bg-gray-500/30 cursor-pointer px-4 py-2">
                    <Link to="/elements" className="block ">
                      Elements
                    </Link>
                  </li>
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
                    onClick={() => setMode(!mode)}
                  />
                ) : (
                  <MdBrightnessMedium
                    size={20}
                    className={`transition cursor-pointer  duration-700`}
                    onClick={() => setMode(!mode)}
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
                  onClick={() => setMode(!mode)}
                />
              ) : (
                <MdBrightnessMedium
                  size={25}
                  className={`transition cursor-pointer  duration-700`}
                  onClick={() => setMode(!mode)}
                />
              )}
              <div className="relative flex justify-center items-center">
                <IoIosNotifications
                  className={`transition ${
                    !mode ? "text-black" : "text-white"
                  }  cursor-pointer duration-500`}
                  size={25}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full  h-20 bg-[#18212C]">
        <div className=" mx-auto h-full max-w-6xl flex justify-between items-center px-4">
          <li className="h-full list-none">
            <NavLink
              to={"/"}
              className="h-full  text-white font-700 flex justify-center items-center flex-col"
            >
              <FaTachometerAlt size={20} className="text-white" />
              DashBoard
            </NavLink>
          </li>
          <li className="h-full list-none">
            <NavLink
              to={"/events"}
              className="h-full  text-white font-700 flex justify-center items-center flex-col"
            >
              <FaCalendarCheck size={20} color="white" />
              Events
            </NavLink>
          </li>
          <li className="h-20 list-none">
            <NavLink
              to={"/people"}
              className="h-full  text-white font-700 flex justify-center items-center flex-col"
            >
              <FaUsers size={20} color="#fff" />
              Peoples
            </NavLink>
          </li>
          <li className="h-full list-none">
            <NavLink
              to="/messages"
              className="h-full  text-white font-700 flex justify-center items-center flex-col"
            >
              <FaEnvelope size={20} color="white" />
              Messages
            </NavLink>
          </li>
          <li className="h-full list-none">
            <NavLink
              to="/calendar"
              className="h-full  text-white font-700 flex justify-center items-center flex-col"
            >
              <FaCalendarAlt size={20} color="white" />
              Calendar
            </NavLink>
          </li>
          <li className="h-full list-none">
            <NavLink
              to={"/profile"}
              className="h-full font-700 text-white flex justify-center items-center flex-col"
            >
              <FaCog size={20} color="white" />
              Settings
            </NavLink>
          </li>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
