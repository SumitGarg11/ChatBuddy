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
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    navigate('/');
  }
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      {/* Profile Card Container */}
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        
        {/* -------- Left: Profile Form -------- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
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
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" required placeholder="Your name"  className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 "  />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio}  placeholder="Write profile bio" required className="p-2 border focus:ring-violet-500" rows={4} ></textarea>
          <button type="submit" className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer " >Save</button>
        </form>

        {/* -------- Right: Optional Image/Content -------- */}
        <img className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 " src={assets.logo_icon} alt="" />
      </div>
    </div>
  );
};

export default ProfilePage;
