import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = ({ openProfileModal }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-11 h-11 bg-gray-600 rounded-full mr-3 cursor-pointer object-cover"
            onClick={openProfileModal}
          />
        ) : (
          <div
            className="w-11 h-11 bg-gray-600 rounded-full mr-3 cursor-pointer"
            onClick={openProfileModal}
          />
        )}
        <div>
          <div className="text-[15px] text-white font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-yellow-400 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
