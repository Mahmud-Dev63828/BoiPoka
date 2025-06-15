import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import BookMockup from "../CommonComponent/BookMockup"; // Adjust path as needed

const formatTime = (seconds) => {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hrs = Math.floor((seconds % (60 * 60 * 24)) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const BookDetails = ({
  title = "Make it Happen",
  author = "Lara Casey",
  review = "",
  initialRating = 4,
  deadline = "2025-06-30T23:59:59",
  notes = [],
}) => {
  const [isFav, setIsFav] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [readsToday, setReadsToday] = useState(0);
  const [noteText, setNoteText] = useState("");
  const [noteImage, setNoteImage] = useState(null);
  const [allNotes, setAllNotes] = useState(notes);
  const [timeLeft, setTimeLeft] = useState("");
  const [userReview, setUserReview] = useState(review);
  const [reviewInput, setReviewInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((new Date(deadline) - new Date()) / 1000);
      setTimeLeft(diff > 0 ? formatTime(diff) : "Completed");
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;
    const newNote = {
      text: noteText.trim(),
      img: noteImage ? URL.createObjectURL(noteImage) : null,
    };
    setAllNotes([newNote, ...allNotes]);
    setNoteText("");
    setNoteImage(null);
  };

  const handlePageSubmit = () => {
    alert(`Submitted ${readsToday} pages read today.`);
    setReadsToday(0);
  };

  const handleAddReview = () => {
    if (reviewInput.trim()) {
      setUserReview(reviewInput.trim());
      setReviewInput("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-6xl mx-auto p-6 h-full">
      {/* Left Column */}
      <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
        <div className="self-start text-red-400 cursor-pointer">
          {isFav ? (
            <FaHeart onClick={() => setIsFav(false)} className="w-6 h-6" />
          ) : (
            <FaRegHeart onClick={() => setIsFav(true)} className="w-6 h-6" />
          )}
        </div>

        <BookMockup
          title={title}
          author={author}
          rating={rating}
          width="w-40"
          height="h-60"
          titleFont="text-lg"
          authorFont="text-sm"
          starSize="w-5 h-5"
        />

        <div className="w-full max-h-60 overflow-y-auto px-2">
          <h4 className="font-semibold text-gray-800 mb-2">Notes</h4>
          {allNotes.length === 0 ? (
            <p className="text-sm text-gray-500">No notes yet.</p>
          ) : (
            allNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3 mb-3">
                {note.img && (
                  <img
                    src={note.img}
                    alt={`note-${idx}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                )}
                <p className="text-base text-gray-700">{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col space-y-4 pl-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 font-medium">by {author}</p>

        {/* Review Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Review</h2>
          {userReview ? (
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {userReview}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Write a review..."
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
              />
              <button
                onClick={handleAddReview}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 self-start"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          <p className="text-gray-400">Give Review</p>
          {[...Array(5)].map((_, i) =>
            i < rating ? (
              <AiFillStar
                key={i}
                className="text-red-400 text-2xl  cursor-pointer"
                onClick={() => setRating(i + 1)}
              />
            ) : (
              <AiOutlineStar
                key={i}
                className="text-red-400 text-2xl cursor-pointer"
                onClick={() => setRating(i + 1)}
              />
            )
          )}
        </div>

        {/* Status + Countdown */}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 font-medium">
            Reading
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <MdAccessTime className="text-gray-500" />
            {timeLeft}
          </span>
        </div>

        {/* Pages Read Today */}
        <div className="flex items-center gap-3 mt-2">
          <label className="font-medium text-gray-700 text-sm">
            Pages read today:
          </label>
          <input
            type="number"
            value={readsToday}
            onChange={(e) => setReadsToday(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            onClick={handlePageSubmit}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Submit
          </button>
        </div>

        {/* Add Note */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800 mb-1 text-base">
            Add Note
          </h4>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Write your note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNoteImage(e.target.files[0])}
            className="block text-sm text-gray-600 my-2"
          />
          <button
            onClick={handleAddNote}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
