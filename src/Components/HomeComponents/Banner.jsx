import { useEffect, useState, useRef } from "react";
import BannerImg from "../../assets/Home/bannerImg1.png";
import { GiBookAura } from "react-icons/gi";
import gsap from "gsap";
import { RiAddCircleFill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import BookProgressBar from "../CommonComponent/BookProgressBar";
import CircleProgressBar from "../CommonComponent/CircleProgressBar";
import AddBookModal from "../AddBook/AddBookModal";

const Banner = ({ totalPages = 100 }) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAddBook, setShowAddBook] = useState(false);

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
  console.log(showAddBook);

  return (
    <div className="w-full h-[49vh] relative overflow-hidden bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-1">
      {/* Red background shape on right side */}

      {/* Left text content */}
      <div className="z-10 max-w-xl text-center md:text-left">
        <div className="w-6 h-2.5 bg-red-400 rounded-full mb-1" />
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
          <div
            onClick={() => setShowAddBook(!showAddBook)}
            className="flex items-center bg-red-400 rounded-xl px-3  py-1"
          >
            <p className="text-sm text-whitee">Add Book</p>
            <span className="  text-whitee  text-xl">
              <IoAdd />
            </span>
          </div>
        </div>
      </div>

      {/* Right book image */}
      <div className="relative z-10 w-full md:w-[600px] mb-10 flex justify-center items-center">
        <img
          src={BannerImg}
          alt="Book"
          className="w-full max-w-md object-contain "
        />
        <div className="absolute flex flex-col items-center top-1/2  transform -translate-y-1/2 text-center">
          <span className="text-gray-900 text-6xl">
            <GiBookAura />
          </span>
          <h3 className="text-lg mt-3 font-bold text-gray-800">
            The Timekeeper
          </h3>
          <p className="text-sm text-gray-600">by Mitch Albom</p>
          <button className="mt-8 cursor-pointer bg-gray-400 text-whitee px-5 py-1.5 rounded-3xl">
            Update
          </button>
        </div>
      </div>
      {/* progress bar */}
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <CircleProgressBar
          percentage={75}
          label="Reading Progress"
          width="33dvw"
          height="33dvh"
        />

        {/* <button
          onClick={handleNextPage}
          className="mt-6 px-6 py-2 bg-red-400 text-white rounded-xl hover:bg-red-500 shadow-lg"
        >
          পড়া চালিয়ে যান (Next Page)
        </button> */}

        <span className="mb-8">
          <BookProgressBar currentPage={220} totalPages={300} />
        </span>
      </div>
      {showAddBook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={() => setShowAddBook(false)} // 👈 close on background click
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AddBookModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
