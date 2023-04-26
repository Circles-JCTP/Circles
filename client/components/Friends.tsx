import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Friend } from "../frontEndTypes";
import AddFriend from "../components/AddFriend";

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
  const handleFriendAdded = () => {
    getFriends();
  };
  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto p-6">
        <div className="relative rounded overflow-hidden mb-8">
          <h3 className="text-4xl px-2 py-3 leading-tight">Friends</h3>
          <div className="w-full">
            {friends.map((friend) => {
              return (
                <>
                  <div
                    key={friend.id}
                    className="flex cursor-pointer my-1 hover:bg-blue-lightest rounded"
                  >
                    <div className="w-4/5 h-10 py-3 px-1">
                      <p className="text-2xl hover:text-blue-dark">
                        {friend.name}
                      </p>
                    </div>
                    <div className="w-1/5 h-10 text-right p-3">
                      <p className="text-2xl text-grey-dark">{friend.email}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <AddFriend onFriendAdded={handleFriendAdded} />
    </>
  );
};

export default Friends;
