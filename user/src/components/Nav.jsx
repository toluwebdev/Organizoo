import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { CiSearch } from "react-icons/ci";

const Nav = () => {
  const navPages = [
    
  ]
  const { isLogin, userData, logout } = useAppContext();
  console.log(userData);

  return (
    <nav>
      <div className="h-20 mx-auto max-w-6xl flex justify-between items-center px-4">
        <Link to="/">
          <img src={assets.blackLogo} className="h-10" alt="" />
        </Link>

        <div className="flex gap-6 h-full items-center justify-center">
          {" "}
          <div className="flex gap-2 p-2 w-xs max-w-full items-center h-full bg-[#F9F9F9] ">
            <CiSearch size={24} className="text-gray-400" />
            <input
              type="text"
              className="outline-none text-black border-none"
              placeholder="Search"
            />
          </div>
          <button className="bg-[#0B8F76] p-3 rounded-md px-7 font-medium text-white">
            Create New Event
          </button>
        </div>

        {isLogin ? (
          <div className="flex items-center gap-3">
            <span>
              <b className="font-medium">REVENUE:</b> $20000
            </span>
            <div className="group relative">
              <img
                src={userData?.imageUrl}
                className="size-10 cursor-pointer rounded-full"
                alt="Profile"
              />
              <ul className="absolute right-0 bg-white  min-w-[200px] hidden group-hover:block rounded-lg overflow-hidden shadow-xl">
                <li className="hover:bg-gray-50 cursor-pointer px-4 py-2">
                  <Link to="/profile" className="block ">
                    My Profile
                  </Link>
                </li>
                <li className="hover:bg-gray-50 cursor-pointer px-4 py-2">
                  <Link to="/notifications" className="block ">
                    Notifications
                  </Link>
                </li>
                <li className="hover:bg-gray-50 cursor-pointer px-4 py-2">
                  <Link to="/eventcreated" className="block ">
                    Event Created
                  </Link>
                </li>
                <li className="hover:bg-gray-50 cursor-pointer px-4 py-2">
                  <Link to="/eventAttended" className="block ">
                    Event Attended
                  </Link>
                </li>
                <li className="hover:bg-gray-50 cursor-pointer px-4 py-2">
                  <Link to="/elements" className="block ">
                    Elements
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="hover:bg-gray-50 text-red-500 cursor-pointer px-4 py-2"
                >
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-[#0B8F76] p-2 rounded-full px-7 font-medium text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#0B8F76] p-2 rounded-full px-7 font-medium text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
      <div className="w-full h-20 bg-[#18212C]">
        <div className=" mx-auto max-w-6xl flex justify-between items-center px-4">

        </div>
      </div>
    </nav>
  );
};
export default Nav;
