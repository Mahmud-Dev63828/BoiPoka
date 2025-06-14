import React, { useState } from "react";
import { FaBook, FaRegCalendarAlt } from "react-icons/fa";
import CalendarPopup from "../Components/CommonComponent/CalendarPopup";
import SelectDropdown from "../Components/CommonComponent/SelectDropdown "; // Adjust the path as needed

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    author: "",
    category: "Fiction",
    startDate: new Date(),
    endDate: "",
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
      const parsed = new Date(value);
      if (!isNaN(parsed)) {
        setBook((prev) => ({ ...prev, startDate: parsed }));
      }
    } else {
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date) => {
    setBook((prev) => ({ ...prev, endDate: date }));
    setShowCalendar(false);
  };

  const handleAdd = () => {
    console.log("Book Added:", book);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="bg-white w-full max-w-4xl mx-auto p-8 rounded-2xl shadow-md">
        <div className="text-center mb-6">
          <FaBook className="text-red-400 text-4xl mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-gray-800">Add a Book</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Custom Select Dropdown */}
          <div className="w-full">
            <SelectDropdown value={book.category} onChange={handleChange} />
          </div>

          {/* Start Date (editable input with current time) */}
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

          {/* End Date (calendar popup + manual display) */}
          <div className="relative col-span-1">
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
        </div>

        <button
          onClick={handleAdd}
          className="mt-6 w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
