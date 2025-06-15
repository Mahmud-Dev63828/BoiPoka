import React, { useMemo } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const BookMockup = ({
  title,
  author,
  rating,
  width = "w-24",
  height = "h-40",
  titleFont = "text-sm",
  authorFont = "text-xs",
  starSize = "w-4 h-4",
}) => {
  const randomColor = () => {
    const colors = [
      "bg-red-300",
      "bg-pink-300",
      "bg-blue-300",
      "bg-green-300",
      "bg-indigo-300",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const bgColor = useMemo(() => randomColor(), []);

  return (
    <div className={`flex flex-col items-center ${width}`}>
      {/* Book demo */}
      <div
        className={`w-full ${height} rounded-lg shadow-lg flex items-center justify-center text-center px-2 ${bgColor}`}
      >
        <div>
          <h3 className={`${titleFont} font-semibold text-gray-800`}>
            {title}
          </h3>
          <p className={`${authorFont} italic text-gray-700 mt-1`}>{author}</p>
        </div>
      </div>

      {/* Stars below the book */}
      <div className="flex gap-0.5 mt-2">
        {[...Array(5)].map((_, i) =>
          i < rating ? (
            <AiFillStar key={i} className={`text-red-400 ${starSize}`} />
          ) : (
            <AiOutlineStar key={i} className={`text-red-400 ${starSize}`} />
          )
        )}
      </div>
    </div>
  );
};

export default BookMockup;
