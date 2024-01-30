import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { getPartner } from "../../../api/chatApi";
import { updateProfileImage } from "../../../api/partnerApi";
import { useSelector } from "react-redux";
import ProfileEditModal from "../../common/ProfileEditModal";
import Loading from "../../loading/Loading";

const ProfileCard = () => {
  const { partner } = useSelector((state) => state.partnerReducer);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState(null);
  const [profileImage, setProfileImage] = useState([]);
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
      setProfileImage(reader.result);
    };
  };

  useEffect(() => {
    getPartner(partner._id)
      .then((res) => {
        setUserData(res?.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleUpdateImage = async () => {
    try {
      setLoading(true);
      const res = await updateProfileImage(
        userData._id,
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
        {!loading ? (
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

            <ProfileEditModal
              data={userData}
              setData={setUserData}
              role="partner"
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
