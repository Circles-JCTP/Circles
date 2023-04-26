import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Friends from "../components/Friends";
import VideoPlayer from "../components/VideoPlayer.jsx";
import Options from "../components/Options.jsx";
import Notifications from "../components/Notifications";

const UserPage = () => {
  const navigate = useNavigate();
  const name = Cookies.get("name");

  useEffect(() => {
    if (name === "null") {
      navigate("/");
    }
  }, [name]);

  return (
    <>
    <div>

      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-700 from-sky-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Welcome, {name}
        </span>
      </h2>
      <div className="absolute top-0 right-0">

      <Logout/>
      </div>
    </div>
      <Friends />

      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </>
  );
};

export default UserPage;
