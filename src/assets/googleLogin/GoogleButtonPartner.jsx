import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { partnerLogin } from "../../reduxStore/slices/partnerSlice";
import { partnerLoginWithGoogle } from "../../api/partnerApi";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const GoogleButtonPartner = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const responseMessage = async (response) => {
    try {
      const partner = jwt_decode(response?.credential);
      const res = await partnerLoginWithGoogle(partner?.email)
      if (res?.status === 200) {
        const { token, registeredPartner } =  res?.data ?? {};
        localStorage.setItem("partnerToken", token);
        dispatch(
          partnerLogin({
            token: token,
            partner: registeredPartner,
          })
        );
        toast.success(res?.data?.message);
        navigate("/partner");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  }

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
  )
}

export default GoogleButtonPartner