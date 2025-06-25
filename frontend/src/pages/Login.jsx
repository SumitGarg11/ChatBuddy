import React from "react";
import assets from "../assets/assets";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl ">
      {/* <--------- left ---------> */}
      <img src={assets.chatlogo} alt="" className="w-[min(30vw,250px)]" />

      {/* ------------- Right ----------- */}

      <form
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg  "
        action=""
      >
        <h2></h2>
      </form>
    </div>
  );
};

export default Login;
