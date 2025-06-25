import React from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

/**
 * Sidebar Component
 * Displays a searchable list of users and a dropdown menu for profile options.
 *
 * Props:
 * - selectedUser: currently selected user object
 * - setSelectedUser: function to update selected user
 */
const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Header: Logo and menu options */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          {/* ChatBuddy Logo */}
          <img
            src={assets.chatlogo}
            alt="ChatBuddy Logo"
            className="max-w-40"
          />

          {/* Menu dropdown with Edit Profile and Logout */}
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu Icon"
              className="max-h-5 cursor-pointer"
            />

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

        {/* User search input */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search Icon" className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id && "bg-[#282142]/50"
            }`}
          >
            {/* User avatar */}
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt={`${user.fullName}'s avatar`}
              className="w-[35px] aspect-[1/1] rounded-full"
            />

            {/* User name and online/offline status */}
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              <span
                className={`text-xs ${
                  index < 3 ? "text-green-400" : "text-neutral-400"
                }`}
              >
                {index < 3 ? "Online" : "Offline"}
              </span>
            </div>

            {/* Unread message indicator */}
            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
