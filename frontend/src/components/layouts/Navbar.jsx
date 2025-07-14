// import React from 'react';
// import ProfileInfoCard from "../Cards/ProfileInfoCard";
// import { Link } from "react-router-dom";
// const Navbar = () => {
//     return (
//         <div className="h-16 bg-white border boredr-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
//             <div className="container mx-auto flex items-center justify-between gap-5">
//                 <Link to="/dashboard">
//                   <h2 className="text-lg md:text-xl font-medium text-black leading-5 ">
//                     Interview Prep Portal
//                   </h2>
//                 </Link>
//                 <ProfileInfoCard />
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React, { useState } from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import Modal from "../Modal"; // Adjust path if needed
import ProfileSettings from "../../pages/Auth/ProfileSettings"; // Adjust path if needed
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
        <div className="container max-w-[1200px] mx-auto flex items-center justify-between gap-5">
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
