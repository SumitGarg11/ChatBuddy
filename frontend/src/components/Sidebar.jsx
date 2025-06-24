import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    // Sidebar container: background, rounded edge, scrollable, hidden on small screens if a user is selected
    <div
      className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      } `}
    >
      {/* Top section: Logo and menu icon */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <img
            src={assets.chatlogo}
            alt="ChatBuddy Logo"
            className="max-w-40"
          />

          {/* Menu icon with dropdown */}
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu Icon"
              className="max-h-5 cursor-pointer"
            />

            {/* Dropdown menu: shows on hover */}
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>
        {/* Search input field */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5 ">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1 "
            placeholder="Search User..."
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
