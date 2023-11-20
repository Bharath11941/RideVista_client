import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getPartner } from '../../../api/chatApi'


const ChatList = ({data,currentUserId,online}) => {
  const [partnerData,setPartnerData] = useState(null)
  useEffect(()=>{
    const partnerId = data?.members?.find((id) => id !== currentUserId)
    const getPartnerData = async () => {
      try {
        const {data} = await getPartner(partnerId)
      setPartnerData(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPartnerData()
  },[data,currentUserId])
  return (
    <>
    <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-50">
      <div className="w-1/4">
        <img
          src='assets/images/car1.jpg'
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{partnerData?.name}</div>
        <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
      </div>
    </div>
    <hr style={{width:"85%", border:"0.1px solid #ececec"}}/>
    </>
  )
}

export default ChatList