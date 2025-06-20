import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu, darkMode, onToggleDarkMode }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border boredr-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 items-center justify-between">
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      </div>
      {/* Dark/Light mode toggle button */}
      <button
        className="ml-auto px-2 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-900 transition text-base"
        style={{ minWidth: 36 }}
        onClick={onToggleDarkMode}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
