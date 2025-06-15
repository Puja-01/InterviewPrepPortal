import React from "react";
import { getInitials } from "../../../utils/helper"; // Adjust the path as needed

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-gray-900 text-white relative">
      <div className="container px-30"> {/* Updated padding */}

        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            {/* Initials badge */}
            <div className="w-12 h-12 rounded-md  bg-gradient-to-r from-[#1aa79a] to-[#43269c] flex items-center justify-center text-xl font-bold text-white mr-4">
              {getInitials(role || "")}
            </div>

            {/* Role Info */}
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-medium text-white">{role}</h2>
                  <p className="text-sm text-gray-300 mt-1">{topicsToFocus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <div className="text-[15px] font-semibold text-white bg-gray-700 px-3 py-1 rounded-full">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </div>

            <div className="text-[15px] font-semibold text-white bg-gray-700 px-3 py-1 rounded-full">
              {questions} Q&A
            </div>

            <div className="text-[15px] font-semibold text-white bg-gray-700 px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* Decorative Background Blobs */}
        <div
          className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-gray-900 overflow-hidden absolute top-0 right-0"
          aria-hidden="true"
        >
          <div className="w-16 h-16 bg-lime-800 blur-[65px] animate-blob1" />
          <div className="w-16 h-16 bg-teal-800 blur-[65px] animate-blob2" />
          <div className="w-16 h-16 bg-cyan-700 blur-[45px] animate-blob3" />
          <div className="w-16 h-16 bg-fuchsia-900 blur-[45px] animate-blob1" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
