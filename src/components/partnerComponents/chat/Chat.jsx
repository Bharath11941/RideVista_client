import React from 'react'
import ChatList from './ChatList'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ChatBox from './ChatBox';
import { userChats } from '../../../api/chatApi';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const { partner } = useSelector((state) => state.partnerReducer);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([])
  const [sendMessage,setSendMessage] = useState(null)
  const [recieveMessage,setRecieveMessage] = useState(null)
  const socket = useRef()
   //sending message to socket server
   useEffect(()=>{
    if(sendMessage !== null){
      socket.current.emit('send-message',sendMessage)
    }
  },[sendMessage])

  

  useEffect(()=>{
    socket.current = io("http://localhost:8800")
    socket.current.emit('new-user-add',partner._id)
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users)
    })
  },[partner])

  //revieve message from socket server
  useEffect(()=>{
    socket.current.on('recieve-message',(data => {
      setRecieveMessage(data)
    }))
  },[])

 
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(partner._id);
        setChats(data);
      } catch (error) {
        console.log(error.messaage);
      }
    };
    getChats();
  }, [partner]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== partner._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
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
                    {chats.map((chat) => (
                      <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                        <ChatList data={chat} currentPartnerId={partner._id} online={checkOnlineStatus(chat)}/>
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
                   <ChatBox chat={currentChat} currentPartner={partner._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
                   {/* setSendMessage={setSendMessage} recieveMessage={recieveMessage} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
