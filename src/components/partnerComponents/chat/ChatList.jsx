import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../../api/chatApi";

const ChatList = ({ data, currentPartnerId,online }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentPartnerId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);
  return (
    <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-50">
      <div className="w-1/4">
        <img
          src={userData?.profileImage || "/images/person-304893_1280.png"}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{userData?.name}</div>
  
        <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};

export default ChatList;
