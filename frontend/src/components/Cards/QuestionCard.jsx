import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="bg-[#1f1f1f] rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-black/40 border border-gray-700 group">
        <div className="flex items-start justify-between cursor-pointer">
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            <span className="text-xs md:text-[17px] font-semibold text-gray-400 leading-[18px]">
              Q
            </span>

            <h3
              className="text-xs md:text-[17px] font-medium text-gray-200 mr-0 md:mr-20"
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end ml-4 relative flex-shrink-0">
            <div
              className={`flex ${
                isExpanded ? "md:flex" : "md:hidden group-hover:flex"
              }`}
            >
              <button
                className="flex items-center gap-2 text-sm text-yellow-300 font-medium bg-yellow-900/20 px-3 py-1 mr-2 rounded text-nowrap border border-yellow-800/40 hover:border-yellow-500/60 cursor-pointer"
                onClick={onTogglePin}
              >
                {isPinned ? (
                  <LuPinOff className="text-sm" />
                ) : (
                  <LuPin className="text-sm" />
                )}
              </button>

              <button
                className="flex items-center gap-2 text-sm text-teal-300 font-medium bg-teal-900/20 px-3 py-1 mr-2 rounded text-nowrap border border-teal-800/40 hover:border-teal-500/60 cursor-pointer"
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <LuSparkles />
                <span className="hidden md:block">Learn More</span>
              </button>
            </div>

            <button
              className="text-gray-400 hover:text-gray-300 cursor-pointer"
              onClick={toggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-gray-600 bg-gray-800 px-5 py-3 rounded-lg"
          >
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
