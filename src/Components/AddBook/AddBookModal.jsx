import React, { useState, useEffect } from "react";
import { FaBook, FaRegCalendarAlt, FaUpload } from "react-icons/fa";
import CalendarPopup from "../CommonComponent/CalendarPopup";
import SelectDropdown from "../CommonComponent/SelectDropdown ";
import { update } from "firebase/database";

const AddBookModal = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    category: "Fiction",
    startDate: new Date(),
    endDate: "",
    coverUrl: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(d.getDate())}/${pad(
      d.getMonth() + 1
    )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setBook((prev) => ({ ...prev, [name]: parsedDate }));
      }
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date) => {
    setBook((prev) => ({ ...prev, endDate: date }));
    setShowCalendar(false);
  };

  // upload wizard
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCoverUpload = () => {
    if (window.cloudinary) {
      cloudinary.openUploadWidget(
        {
          cloudName: "dazbaelpk",
          uploadPreset: "BoiPoka",
          googleApiKey: "AIzaSyBj7HACYr7i1dWgC81FalKEwMuPXarS3rk",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          sources: [
            "local",
            "url",
            "camera",
            "image_search",
            "dropbox",
            "image_search",
            "shutterstock",
            "unsplash",
          ],
        },
        (error, result) => {
          if (error) {
            throw new Error("cloudinary profile picture upload error");
          }
          if (result.info.secure_url) {
            // for update profile picture on state
            setBook((prev) => ({
              ...prev,
              coverUrl: result.info.secure_url,
            }));
          }
        }
      );
    } else {
      throw new Error("upload failed");
    }
  };

  const handleAdd = () => {
    console.log("Book Added:", book);
  };
  console.log(book);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg relative">
        <div className="text-center mb-6">
          <FaBook className="text-red-400 text-3xl mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Add a Book</h2>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            placeholder="Book Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />

          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />

          <SelectDropdown value={book.category} onChange={handleChange} />

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="text"
              name="startDate"
              value={formatDateTime(book.startDate)}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none text-gray-700"
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">End Date</label>
            <div className="flex items-center relative">
              <input
                type="text"
                name="endDate"
                value={book.endDate ? formatDateTime(book.endDate) : ""}
                readOnly
                placeholder="Select end date"
                onClick={() => setShowCalendar((prev) => !prev)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-red-400 outline-none text-gray-700 cursor-pointer bg-white"
              />
              <FaRegCalendarAlt
                onClick={() => setShowCalendar((prev) => !prev)}
                className="absolute right-3 text-gray-500 cursor-pointer hover:text-red-400"
              />
            </div>

            {showCalendar && (
              <div className="absolute bottom-14 right-0 z-50">
                <CalendarPopup
                  deadline={book.endDate}
                  onSelect={handleDateSelect}
                />
              </div>
            )}
          </div>

          {/* Cloudinary Upload Button */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Book Cover
            </label>
            <button
              onClick={handleCoverUpload}
              className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 font-medium px-4 py-2 rounded-lg"
            >
              <FaUpload />
              Upload Cover
            </button>
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt="Cover Preview"
                className="mt-3 w-32 h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-xl transition"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
