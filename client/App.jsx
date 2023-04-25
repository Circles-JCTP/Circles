import React from "react";
import Button from "./components/button";
// import { Typography, AppBar } from "@material-ui/core";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";


const App = () => {
  return (
    <>
      <VideoPlayer />
      <Options> 
        <Notifications />
      </Options>
    </>
  );
};

export default App;