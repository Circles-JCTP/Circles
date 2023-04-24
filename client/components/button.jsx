import React from "react";

const Button = () => {
    const backendReq = () => {
        fetch('/test');
        console.log('made req')
    }
  return (
    <>
      <button onClick={backendReq}>click me</button>
    </>
  );
};

export default Button;
