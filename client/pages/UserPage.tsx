import React from "react";
import Cookies from "js-cookie";

const UserPage = () => {
  const name = Cookies.get("name");
  return (
    <>
      <h2>Logged In!! as {name}</h2>
    </>
  );
};

export default UserPage;
