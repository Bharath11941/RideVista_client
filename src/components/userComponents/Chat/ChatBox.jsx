import Conversation from "./Conversation";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { getPartner } from "../../../api/chatApi";
import { addMessage, getMessages } from "../../../api/messageApi";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [partnerData, setPartnerData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();
  
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  console.log(recieveMessage,"from chat box user")

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //fetching data for the header of the chat box
  useEffect(() => {
    const partnerId = chat?.members?.find((id) => id !== currentUser);
    const getPartnerData = async () => {
      try {
        const { data } = await getPartner(partnerId);
        setPartnerData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) getPartnerData();
  }, [chat, currentUser]);

  //fetching data for messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
    //  send message to socket server
    const recieverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, recieverId });
  };
  return (
    <>
      {chat ? (
        <>
          <div
            className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex sm:items-center justify-between  border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src="../../../assets/Icons/calendar-icon.svg"
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {partnerData?.name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    className="fill-current text-info"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 48 48"
                    id="Layer_1"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Layer_3">
                      <path
                        d="M0,109.7v292.6h402.3v-61.7L512,395.4V116.6l-109.7,54.9v-61.7H0z M36.6,146.3h329.1v219.4H36.6V146.3z M475.4,176v160l-73.1-36.6v-86.9L475.4,176z"
                        fill="#241F20"
                        className="fill-current text-info"
                      />
                    </g>
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 h-screen scrolling-touch "
            >
              {messages.map((message) => (
                <div ref={scroll} key={message._id}>
                  <Conversation message={message} currentUser={currentUser} />
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <InputEmoji value={newMessage} onChange={handleChange} />

                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex-1 p:2 sm:p-6 justify-center flex items-center text-gray-300"
          style={{ maxHeight: "90vh", fontSize: "50px" }}
        >
          Open a chat to start a conversation
        </div>
      )}
    </>
  );
};

export default ChatBox;
