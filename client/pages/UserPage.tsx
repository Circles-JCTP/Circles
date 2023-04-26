import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Friends from "../components/Friends";
import AddFriend from "../components/AddFriend";

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
      <AddFriend />
      <Logout />
    </>
  );
};

export default UserPage;