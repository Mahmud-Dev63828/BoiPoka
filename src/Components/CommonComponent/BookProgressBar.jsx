import React from "react";
import { FaChartLine } from "react-icons/fa";

const BookProgressBar = ({ currentPage, totalPages }) => {
  const progress = Math.min((currentPage / totalPages) * 100, 100);

  return (
    <div className="relative bg-white rounded-xl shadow-sm px-4 py-3 w-[20dvw] min-w-[150px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-100 p-2 rounded-full">
            <FaChartLine className="text-red-400 w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Book Progress
          </span>
        </div>
        <span className="text-sm font-semibold text-gray-800">
          {currentPage}/{totalPages}
        </span>
      </div>

      {/* নিচের progress bar */}
      <div className="w-full h-1 mt-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default BookProgressBar;
