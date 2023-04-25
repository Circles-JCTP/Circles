import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

const UserPage = () => {
  const navigate = useNavigate();

  const name = Cookies.get("name");
  if (!name) {
    navigate("/");
  } else {
    return (
      <>
        <h2>Logged In!! as {name}</h2>
        <Logout />
      </>
    );
  }
};

export default UserPage;
