import React, { useState } from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import Modal from "../Modal"; 
import ProfileSettings from "../../pages/Auth/ProfileSettings"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <div className="h-16 bg-gray-900 border border-b border-gray-700 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
        <div className="container max-w-[1300px] mx-auto flex items-center justify-between gap-5">
          <Link to="/dashboard">
            <h2 className="text-xl md:text-xl font-medium text-white leading-5">
              Interview Prep Portal
            </h2>
          </Link>
          <ProfileInfoCard openProfileModal={openProfileModal} />
        </div>
      </div>

      <Modal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        title="Update Profile Picture"
      >
        <ProfileSettings
          onSuccess={() => {
            closeProfileModal();
          }}
        />
      </Modal>
    </>
  );
};

export default Navbar;
