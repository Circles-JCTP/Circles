import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Home = () => {
  return (
    <>
      <h1 className="text-9xl font-extrabold font-montserrat">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-700 from-sky-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Circles
        </span>
      </h1>
      <Login></Login>
      <SignUp></SignUp>
    </>
  );
};

export default Home;
