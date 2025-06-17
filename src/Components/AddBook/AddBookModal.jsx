import React, { useState, useEffect, useRef } from "react";
import { FaBook, FaRegCalendarAlt, FaUpload } from "react-icons/fa";
import CalendarPopup from "../CommonComponent/CalendarPopup";
import SelectDropdown from "../CommonComponent/SelectDropdown ";
import { validationField } from "../../validation/validationField";
import { setFirebaseData } from "../../utils/upload";
import { getAuth } from "firebase/auth";

const AddBookModal = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    category: "Fiction",
    startDate: new Date(),
    endDate: "",
    coverUrl: "",
  });

  const [bookError, setBookError] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputImageRef = useRef(null);

  const formatDateTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(d.getDate())}/${pad(
      d.getMonth() + 1
    )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "startDate") {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setBook((prev) => ({ ...prev, [name]: parsedDate }));
      }
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
    setBookError((prev) => ({ ...prev, [`${name}Error`]: "" }));
  };

  const handleDateSelect = (date) => {
    setBook((prev) => ({ ...prev, endDate: date }));
    setBookError((prev) => ({ ...prev, endDateError: "" }));
    setShowCalendar(false);
  };

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
          sources: [
            "local",
            "url",
            "camera",
            "image_search",
            "dropbox",
            "unsplash",
          ],
        },
        (error, result) => {
          if (result?.info?.secure_url) {
            setBook((prev) => ({
              ...prev,
              coverUrl: result.info.secure_url,
            }));
          }
        }
      );
    }
  };

  const handleAdd = async () => {
    const isValid = validationField(book, setBookError, {
      ignoreFields: ["coverUrl"],
    });
    if (!isValid) return;

    if (!book.endDate) {
      setBookError((prev) => ({
        ...prev,
        endDateError: "End date is required",
      }));
      return;
    }

    const auth = getAuth();
    try {
      setLoading(true);

      const newBookData = {
        name: book.name,
        author: book.author,
        category: book.category,
        startDate: book.startDate.toISOString(),
        endDate: new Date(book.endDate).toISOString(),
        coverUrl:
          book.coverUrl && typeof book.coverUrl === "string"
            ? book.coverUrl
            : "", // 🔴 এই লাইন গুরুত্বপূর্ণ
        createdBy: {
          uid: auth.currentUser?.uid,
          email: auth.currentUser?.email,
          displayName: auth.currentUser?.displayName,
          photoURL: auth.currentUser?.photoURL,
        },
      };

      await setFirebaseData("books/", newBookData);
      console.log("Book added:", newBookData);
    } catch (err) {
      console.error("Failed to add book:", err);
    } finally {
      setLoading(false);
      setBook({
        name: "",
        author: "",
        category: "Fiction",
        startDate: new Date(),
        endDate: "",
        coverUrl: "",
      });
      setBookError({});
      if (inputImageRef.current) inputImageRef.current.value = null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <FaBook className="text-red-400 text-3xl mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Add a Book</h2>
        </div>

        <div className="space-y-4">
          {/* Book Name */}
          <div>
            <input
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
              placeholder="Book Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {bookError.nameError && (
              <p className="text-red-500 text-sm">{bookError.nameError}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {bookError.authorError && (
              <p className="text-red-500 text-sm">{bookError.authorError}</p>
            )}
          </div>

          {/* Category */}
          <SelectDropdown value={book.category} onChange={handleChange} />

          {/* Start Date */}
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

          {/* End Date */}
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

            {bookError.endDateError && (
              <p className="text-red-500 text-sm mt-1">
                {bookError.endDateError}
              </p>
            )}
          </div>

          {/* Cover Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Book Cover (optional)
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCoverUpload}
                className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 font-medium px-4 py-2 rounded-lg"
              >
                <FaUpload />
                Upload Cover
              </button>

              {book.coverUrl && typeof book.coverUrl === "string" && (
                <img
                  src={book.coverUrl}
                  alt="Cover Preview"
                  className="w-20 h-28 object-cover rounded-lg shadow-md"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleAdd}
            className={`w-full ${
              loading ? "bg-red-300" : "bg-red-400 hover:bg-red-500"
            } text-white font-semibold py-2 rounded-xl transition`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
