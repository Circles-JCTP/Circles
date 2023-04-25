import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "../styles.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginerror" element={<Error />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
