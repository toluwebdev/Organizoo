import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed z-99 w-full px-3 flex justify-center items-center py-5">
      <nav className=" bg-[#110111]/90 flex items-center shadow-md border-2  max-md:w-full max-w-full w-7xl mx-auto justify-between border-white/10 px-6 py-4 rounded-full text-white text-sm">
        {/* Logo */}
        <a href="https://prebuiltui.com" className="w-51">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
            <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
          </svg>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-15 ">
          {["Products", "Stories", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href="#"
              className="relative font-secondary text-[14px] duration-500 text-[#A9AFC2] hover:text-white  overflow-hidden h-6 group"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden ml-14 w-51 md:flex items-center gap-4">
          <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
            Contact
          </button>
          <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute ${
            open ? "flex" : "hidden"
          } top-24 left-0 bg-black w-full flex-col items-center gap-4 py-6 text-base md:hidden`}
        >
          {["Products", "Customer Stories", "Pricing", "Docs"].map((item) => (
            <a key={item} href="#" className="hover:text-indigo-600">
              {item}
            </a>
          ))}

          <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
            Contact
          </button>
          <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
}
