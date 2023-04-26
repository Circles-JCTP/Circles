import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "../styles.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import UserPage from "./pages/UserPage";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";


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

      <VideoPlayer />
      <Options> 
        <Notifications />
      </Options>
    </>
  );
};

export default App;
