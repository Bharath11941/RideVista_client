import React from "react";
import ChatList from "./ChatList";
import { useSelector } from "react-redux";
import { useState } from "react";
import ChatBox from "./ChatBox";
import { userChats } from "../../../api/chatApi";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useRef } from "react";
const END_POINT = "http://localhost:3000";
var socket, selectedChatCompare;

const Chat = () => {
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const partnerId = _id;
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socketConnection, setSocketConnection] = useState(false);

  useEffect(() => {
    userChats(partnerId).then((res) => {
      setConversations(res?.data);
    });
  }, []);

  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", currentChat?._id);
    socket?.on("connection", () => {
      setSocketConnection(true);
    });
    socket?.on("connected", () => {
      setSocketConnection(true);
    });
   
  }, [currentChat]);
  useEffect(()=>{
    socket?.emit("new-user-add", partnerId);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  },[partnerId])
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log("recieve message on", data);
      if (data?.chatId === currentChat?._id) {
        const message = [...messages, data];
        setMessages(message);
      }
    });
  }, [messages]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== partnerId);
    console.log(onlineUsers,"online users")
    const online = onlineUsers.find((user) => user.userId === chatMember);
    console.log(online,"online")
    return online ? true : false;
  };

  return (
    <div>
      <div className="pt-5">
        <div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2 bg-gray-200">
              <div
                className="bg-gray-200 flex flex-col overflow-y-scroll"
                style={{ maxHeight: "85vh" }}
              >
                <div className="bg-gray-200  border-b-2 py-4 px-2 absolute z-10">
                  <input
                    type="text"
                    placeholder="search chatting"
                    className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                  />
                </div>
                {/* <!-- end search compt -->
                 <!-- user list --> */}
                <div className="pt-20">
                  <div className="cursor-pointer">
                    {conversations?.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => {
                          setCurrentChat(chat);
                          socket?.emit("join room", chat._id);
                        }}
                      >
                        <ChatList data={chat} currentUserId={partnerId} online={checkOnlineStatus(chat)}/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-full">
              <div className="bg-gray-100 shadow-sm rounded-sm md:p-1">
                <div className="flex flex-wrap justify-end font-semibold text-gray-900">
                  <div
                    className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
                    style={{ minHeight: "85vh" }}
                  >
                    <ChatBox
                      chat={currentChat}
                      currentUser={partnerId}
                      setMessages={setMessages}
                      messages={messages}
                      socket={socket}
                    />
                    {/* setSendMessage={setSendMessage} recieveMessage={recieveMessage} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
