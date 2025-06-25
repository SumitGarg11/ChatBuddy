import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  // State to hold selected profile image
  const [selectedImg, setSelectedImg] = useState(null);

  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Default name and bio states (can be edited later)
  const [name, setName] = useState("Martin Jonson");
  const [bio, setBio] = useState("Hi Everyone, I am Using ChatBuddy");

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      {/* Profile Card Container */}
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        
        {/* -------- Left: Profile Form -------- */}
        <form className="flex flex-col gap-5 p-10 flex-1">
          {/* Title */}
          <h3 className="text-lg">Profile details</h3>

          {/* Profile Image Upload */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            
            {/* Preview selected image or default avatar */}
            <img
              className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt="Profile Preview"
            />
            Upload Profile Image
          </label>
        </form>

        {/* -------- Right: Optional Image/Content -------- */}
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default ProfilePage;
