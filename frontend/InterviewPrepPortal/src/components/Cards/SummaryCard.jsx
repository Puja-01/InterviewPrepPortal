import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    onDelete(); // Just trigger parent logic (Dashboard handles modal)
  };

  return (
    <div
      className="w-full max-w-[650px] bg-gradient-to-r from-gray-300 via-black-200 to-white-200 border border-gray-300/40 rounded-xl p-3 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group transition-all duration-200"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-5 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-14 h-14 bg-black rounded-md flex items-center justify-center mr-5">
            <span className="text-xl font-semibold text-white">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[20px] text-black font-semibold">{role}</h2>
                <p className="text-sm text-gray-900 mt-1">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-sm text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
          onClick={handleDeleteClick}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="text-[16px] font-medium text-black px-4 py-2 border border-gray-900 rounded-full">
            Experience: {experience} {experience == 1 ? 'Year' : 'Years'}
          </div>

          <div className="text-[15px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            {questions} Q&A
          </div>

          <div className="text-[15px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>

        <p className="text-[14px] text-black font-medium line-clamp-2 mt-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
