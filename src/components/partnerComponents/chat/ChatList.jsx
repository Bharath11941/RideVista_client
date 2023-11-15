import React from 'react'

const ChatList = () => {
  return (
    <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-50">
      <div className="w-1/4">
        <img
          src='assets/images/car1.jpg'
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">Arun</div>
        <span className="text-gray-500">Online</span>
      </div>
    </div>
  )
}

export default ChatList
