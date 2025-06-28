import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

// ChatContainer displays the chat area if a user is selected
const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState("");
  // handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };
  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return selectedUser ? (
    // Main chat container when a user is selected
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* ---------- Header section ---------- */}
      <div className="flex outline-none  items-center gap-3 py-3 mx-4 border-b border border-stone-500 ">
        {/* User profile image */}
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />

        {/* Username and online status */}
        <p className="flex-1 text-lg text-white  flex items-center gap-2 ">
          {selectedUser.fullname}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>

        {/* Back arrow icon (visible on mobile) */}
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 "
        />

        {/* Help icon (hidden on mobile) */}
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* ---------- Chat messages section ---------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6  ">
        { Array.isArray(messages) &&  messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== authUser._id ? "flex-row-reverse" : ""
            }`}
          >
            {/* Show image message if present */}
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8 "
              />
            ) : (
              // Show text message
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId === authUser._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {msg.text}
              </p>
            )}

            {/* Sender avatar and timestamp */}
            <div className="text-center text-xs ">
              <img
                className="w-7 rounded-full  "
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
              />
              {/* --------- Return Hour and Min ----- */}
              <p className="text-gray-500">
                {" "}
                {formatMessageTime(msg.createdAt)}{" "}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/* ---------------Bottom Area ----------- */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3 p-3 ">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full  ">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="send a message "
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400  "
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png,image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer "
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    // Placeholder UI when no user is selected
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden  ">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
