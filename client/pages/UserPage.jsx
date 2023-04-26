import React, { useEffect, useState } from "react";
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
      <h2>Logged In!! as {name}</h2>
      <Friends />
      <Logout />

      <VideoPlayer />
      <Options> 
        <Notifications />
      </Options>
    </>
  );
};

export default UserPage;
