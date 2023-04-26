import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Friend } from "../frontEndTypes";

const Friends = () => {
  const name = Cookies.get("name");
  const [friends, setFriends] = useState<Friend[]>([]);

  const getFriends = () => {
    fetch(`/friends/getlist?name=${name}`)
      .then((res) => {
        res
          .json()
          .then((friends) => {
            setFriends(friends);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => {
          return (
            <li key={friend.id}>
              {friend.name} - {friend.email}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Friends;
