import React from "react";

const InsightCard = ({
  title = "Untitled Insight",
  pages = 0,
  books = 0,
  pageUnit = "Pages",
  bookUnit = "Books",
  width = "20dvw", // ✅ default width in dvw
  height = "18dvh", // ✅ default height in dvh
  onViewClick, // optional click handler
}) => {
  return (
    <div
      className="flex flex-col bg-red-50 border border-red-100 rounded-xl shadow p-3"
      style={{ width, height }}
    >
      <div className="w-2.5 h-2.5 bg-red-400 rounded-full mb-1" />
      <h2 className="text-sm text-gray-700 font-medium">{title}</h2>

      <p className="text-lg font-bold text-gray-900 leading-5">
        {pages} {pageUnit}
      </p>
      <p className="text-xs text-gray-600 leading-4">
        {books} {bookUnit}
      </p>

      <div
        className="mt-2 text-xs text-red-500 hover:underline cursor-pointer"
        onClick={onViewClick}
      >
        View Insights
      </div>
    </div>
  );
};

export default InsightCard;
