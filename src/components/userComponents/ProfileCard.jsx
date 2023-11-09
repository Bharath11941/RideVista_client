import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../api/userApi";
const ProfileCard = () => {
  const {user} = useSelector(state => state.userReducer)
  const [userData,setUserData] = useState({})
  useEffect(()=>{
    getUserDetails(user._id).then((res)=>{
      setUserData(res?.data?.userData)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])
  return (
    <div className="container mx-auto flex items-center justify-center pb-40 mt-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        <div className="flex flex-col items-center pb-10 mt-5">
         <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userData.profileImage ? userData.profileImage : '/src/assets/images/60111.jpg'}
            alt="Bonnie image"
          />

          <h1 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white">
            {userData.name}
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
           email: {userData.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
           Phone:  {userData.mobile}
          </span>
          <h1 className="font-bold text-lg mt-5">Wallet Amount : {userData.wallet}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
