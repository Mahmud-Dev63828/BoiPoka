import React from "react";
import { FaChartLine } from "react-icons/fa";

const BookProgressBar = ({
  currentPage = 0,
  totalPages = 100,
  width = "20dvw",
  height = "14dvh",
  title = "Book Progress",
}) => {
  const progress = Math.min((currentPage / totalPages) * 100, 100);

  // Fixed color values (NOT passed as props anymore)
  const color = "#f87171"; // Tailwind red-400
  const bgColor = "#fef2f2"; // Tailwind red-100

  return (
    <div
      className="relative bg-white rounded-xl shadow-sm px-4 py-3"
      style={{ width, height }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: bgColor }}
          >
            <FaChartLine className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <span className="text-sm font-semibold text-gray-800">
          {currentPage}/{totalPages}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 mt-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default BookProgressBar;
