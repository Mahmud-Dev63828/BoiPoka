import { useEffect, useState, useRef } from "react";
import BannerImg from "../../assets/Home/bannerImg1.png";
import { GiBookAura } from "react-icons/gi";
import gsap from "gsap";

const Banner = ({ totalPages = 100 }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percentage = Math.round((currentPage / totalPages) * 100);
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    gsap.to(circle, {
      strokeDashoffset: offset,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [percentage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-[50vh] relative overflow-hidden bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6">
      {/* Red background shape on right side */}

      {/* Left text content */}
      <div className="z-10 max-w-xl text-center md:text-left">
        <h1 className="text-4xl font-semibold text-gray-800">
          Happy reading, <br />
          Mahmud
        </h1>
        <p className="mt-4 text-gray-600">
          Wow! You're diving into a world of imagination. Don't stop now! Make
          sure to finish before the countdown ends.
        </p>
        <div className="mt-6 flex items-center gap-4 justify-center md:justify-start">
          <button className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
            Start reading ↗
          </button>
          <span className="font-mono text-xl text-gray-700">
            ⏳ {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Right book image */}
      <div className="relative z-10 w-full md:w-[600px] flex justify-center items-center">
        <img
          src={BannerImg}
          alt="Book"
          className="w-full max-w-md object-contain"
        />
        <div className="absolute flex flex-col items-center top-1/2  transform -translate-y-1/2 text-center">
          <span className="text-gray-900 text-5xl">
            <GiBookAura />
          </span>
          <h3 className="text-lg font-bold text-gray-800">The Timekeeper</h3>
          <p className="text-sm text-gray-600">by Mitch Albom</p>
        </div>
      </div>
      {/* progress bar */}
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="relative w-64 h-64">
          <svg className="absolute w-full h-full" viewBox="0 0 256 256">
            {/* Background Circle */}
            <circle
              cx="128"
              cy="128"
              r="90"
              stroke="#f5f5f5"
              strokeWidth="15"
              fill="none"
            />
            {/* Animated Progress Circle */}
            <circle
              ref={circleRef}
              cx="128"
              cy="128"
              r="90"
              stroke="#f87171" // Tailwind red-400 hex
              strokeWidth="15"
              fill="none"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90}
              strokeLinecap="round"
              transform="rotate(-90 128 128)"
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">{percentage}%</h1>
            <p className="text-sm text-gray-500">Employee Satisfactory</p>
          </div>
        </div>

        <button
          onClick={handleNextPage}
          className="mt-6 px-6 py-2 bg-red-400 text-white rounded-xl hover:bg-red-500 shadow-lg"
        >
          পড়া চালিয়ে যান (Next Page)
        </button>
      </div>
    </div>
  );
};

export default Banner;
