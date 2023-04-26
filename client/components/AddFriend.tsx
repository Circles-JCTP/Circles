import React, { useState } from "react";
import Cookies from "js-cookie";

const AddFriend = ({ onFriendAdded }: any) => {
  const [friendsEmail, setFriendsEmail] = useState("");
  const id = Cookies.get("id");
  const AddFriendHandler = () => {
    fetch(`/friends/add?friendsemail=${friendsEmail}&id=${id}`)
      .then(() => {
        onFriendAdded();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="relative content-center w-full">
        <input
          onChange={(event) => setFriendsEmail(event.target.value)}
          type="text"
          id="friend__input"
          className=" mx-auto p-6 block text-gray-900 border border-gray-300 rounded-lg sm:text-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Friends Email"
          autoComplete="on"
        ></input>
        <button
          className="block m-auto mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={AddFriendHandler}
        >
          Add Friend
        </button>
      </div>
    </>
  );
};

export default AddFriend;
