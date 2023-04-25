import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    fetch("/logout").then((res) => {
      navigate("/");
    });
  };
  return <button onClick={logoutHandler}>Logout</button>;
};

export default Logout;
