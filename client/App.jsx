import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "../styles.css";

const App = () => {
  return (
    <>
      <h1 className="text-5xl font-extrabold dark:text">Circles</h1>
      <Login></Login>
    </>
  );
};

export default App;
