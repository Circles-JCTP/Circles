import React, { useState } from "react";
import Cookies from "js-cookie";

const AddFriend = () => {
  const [friendsEmail, setFriendsEmail] = useState("");
  const id = Cookies.get("id");
  const AddFriendHandler = () => {
    fetch(`/friends/add?friendsemail=${friendsEmail}&id=${id}`)
  }
  return (
    <>
      <input
        onChange={(event) => setFriendsEmail(event.target.value)}
        type="text"
        id="friend__input"
        className="block p-4 text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Friends Email"
        autoComplete="on"
      ></input>
      <button className="block" onClick={AddFriendHandler}>add friend</button>
    </>
  );
};

export default AddFriend;
