import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetails, updateProfileImage } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import ProfileEditModal from "../../common/ProfileEditModal";
import Loading from "../../loading/Loading";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState(null);
  const [profileImage, setProfileImage] = useState([]);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (
      file.type &&
      (file.type.startsWith("image/jpeg") || file.type.startsWith("image/png"))
    ) {
      setProfileToBase(file);
      setProfileImageError(null);
    } else {
      setProfileImageError("Invalid file type. Please select a valid image.");
      setProfileImage([]);
      e.target.value = null;
    }
  };
  const setProfileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader?.result);
    };
  };

  useEffect(() => {
    getUserDetails(user._id)
      .then((res) => {
        setUserData(res?.data?.userData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleCopyReferralCode = () => {
    const referralCodeToCopy = userData?.referalCode;

    // Copy to clipboard
    navigator.clipboard.writeText(referralCodeToCopy);

    // Show copied message
    setCopiedMessageVisible(true);

    // Hide the message after a delay (e.g., 2 seconds)
    setTimeout(() => {
      setCopiedMessageVisible(false);
    }, 2000);
  };

  const handleUpdateImage = async () => {
    try {
      setLoading(true);
      const res = await updateProfileImage(
        userData?._id,
        profileImage,
        userData?.profileImage
      );

      setUserData(res?.data?.userData);
      setEditMode(false);
      setSelectedImage(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="container mx-auto flex items-center justify-center pb-40 mt-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {loading ? <Loading/> : (
          <div className="flex flex-col items-center pb-10 mt-5">
          <label className="relative cursor-pointer">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : userData?.profileImage
                  ? userData?.profileImage
                  : "/src/assets/images/60111.jpg"
              }
              alt="Bonnie image"
            />
            {editMode && (
              <div className="absolute right-0 top-0 inset-0 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer opacity-0 absolute inset-0"
                />
              </div>
            )}

            <FontAwesomeIcon
              icon={faUserPen}
              size="xl"
              className="absolute top-0 right-0 text-white cursor-pointer"
              onClick={() => setEditMode(!editMode)}
              style={{ color: "#000000" }}
            />
          </label>
          {loading ? (
            <div className="flex">
              <span className="loading loading-spinner text-info"></span>
              <span className="loading loading-spinner text-info"></span>
              <span className="loading loading-spinner text-info"></span>
            </div>
          ) : (
            selectedImage && (
              <button
                type="button"
                onClick={handleUpdateImage}
                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5"
              >
                Update
              </button>
            )
          )}

          {profileImageError && (
            <div className="text-red-500 text-sm">{profileImageError}</div>
          )}

          <h1 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white">
            {userData?.name}
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            email: {userData?.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Phone: {userData?.mobile}
          </span>
          <h1 className="font-bold text-lg mt-5">
            Wallet Amount : {userData?.wallet}
          </h1>

          {userData?.referalCode && (
            <div className="mt-3 flex items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 me-2">
                Referral Code: {userData?.referalCode}
              </p>
              <button
                type="button"
                onClick={handleCopyReferralCode}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5"
              >
                Copy
              </button>
            </div>
          )}
          {/* Copied message */}
          {copiedMessageVisible && (
            <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>
          )}

          <div className="flex">
            <button
              type="button"
              onClick={() => navigate("/walletHistory", { state: userData })}
              className="text-white mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Wallet History
            </button>
            <ProfileEditModal data={userData} setData={setUserData} role="user" />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
