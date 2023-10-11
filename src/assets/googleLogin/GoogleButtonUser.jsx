
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { userLoginWithGoogle } from "../../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../reduxStore/slices/userSlice";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const GoogleButtonUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const responseMessage = async (response) => {
    try {
      const user = jwt_decode(response.credential);
      const res = await userLoginWithGoogle(user.email)
      if(res.status === 200){
        const {token,registeredUser} = res.data;
        localStorage.setItem("userToken", token);
        dispatch(
          userLogin({
            token: token,
            user: registeredUser,
          })
        );
        toast.success(res?.data?.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const errorMessage = (error) => {
    console.log(error.message);
  };
  return (
    <>
      <div className="pt-2">
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            className="text-black"
            onSuccess={responseMessage}
            onError={errorMessage}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default GoogleButtonUser;
