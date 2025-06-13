import React, { useState } from "react";
import BookMockup from "../CommonComponent/BookMockup";

const books = [
  {
    title: "Cool Poster Design",
    author: "Christina Madsen",
    rating: 5,
    type: "top",
    category: "Fiction",
  },
  {
    title: "Real Estate Dev",
    author: "John Smith",
    rating: 4,
    type: "latest",
    category: "Academic",
  },
  {
    title: "Graphic Design",
    author: "Sarah Beck",
    rating: 3,
    type: "all",
    category: "History",
  },
  {
    title: "Chinese Class",
    author: "Xiang Yuan",
    rating: 2,
    type: "top",
    category: "Academic",
  },
  {
    title: "Automotive Seasons",
    author: "Carla M",
    rating: 5,
    type: "latest",
    category: "Fiction",
  },
  {
    title: "Japanese 4D",
    author: "Kazuko Ishiguro",
    rating: 4,
    type: "top",
    category: "Academic",
  },
  {
    title: "Public Fine Arts",
    author: "Anna Burghardt",
    rating: 5,
    type: "all",
    category: "History",
  },
  {
    title: "Taste",
    author: "Food Vision",
    rating: 3,
    type: "latest",
    category: "Fiction",
  },
  {
    title: "Modern History",
    author: "Dr. Nolan",
    rating: 4,
    type: "top",
    category: "History",
  },
  {
    title: "Advanced Chemistry",
    author: "Linda Ray",
    rating: 5,
    type: "all",
    category: "Academic",
  },
  {
    title: "Cool Poster Design",
    author: "Christina Madsen",
    rating: 5,
    type: "top",
    category: "Fiction",
  },
  {
    title: "Real Estate Dev",
    author: "John Smith",
    rating: 4,
    type: "latest",
    category: "Academic",
  },
  {
    title: "Graphic Design",
    author: "Sarah Beck",
    rating: 3,
    type: "all",
    category: "History",
  },
  {
    title: "Chinese Class",
    author: "Xiang Yuan",
    rating: 2,
    type: "top",
    category: "Academic",
  },
  {
    title: "Automotive Seasons",
    author: "Carla M",
    rating: 5,
    type: "latest",
    category: "Fiction",
  },
  {
    title: "Japanese 4D",
    author: "Kazuko Ishiguro",
    rating: 4,
    type: "top",
    category: "Academic",
  },
  {
    title: "Public Fine Arts",
    author: "Anna Burghardt",
    rating: 5,
    type: "all",
    category: "History",
  },
  {
    title: "Taste",
    author: "Food Vision",
    rating: 3,
    type: "latest",
    category: "Fiction",
  },
  {
    title: "Modern History",
    author: "Dr. Nolan",
    rating: 4,
    type: "top",
    category: "History",
  },
  {
    title: "Advanced Chemistry",
    author: "Linda Ray",
    rating: 5,
    type: "all",
    category: "Academic",
  },
  {
    title: "Cool Poster Design",
    author: "Christina Madsen",
    rating: 5,
    type: "top",
    category: "Fiction",
  },
  {
    title: "Real Estate Dev",
    author: "John Smith",
    rating: 4,
    type: "latest",
    category: "Academic",
  },
  {
    title: "Graphic Design",
    author: "Sarah Beck",
    rating: 3,
    type: "all",
    category: "History",
  },
  {
    title: "Chinese Class",
    author: "Xiang Yuan",
    rating: 2,
    type: "top",
    category: "Academic",
  },
  {
    title: "Automotive Seasons",
    author: "Carla M",
    rating: 5,
    type: "latest",
    category: "Fiction",
  },
  {
    title: "Japanese 4D",
    author: "Kazuko Ishiguro",
    rating: 4,
    type: "top",
    category: "Academic",
  },
  {
    title: "Public Fine Arts",
    author: "Anna Burghardt",
    rating: 5,
    type: "all",
    category: "History",
  },
  {
    title: "Taste",
    author: "Food Vision",
    rating: 3,
    type: "latest",
    category: "Fiction",
  },
  {
    title: "Modern History",
    author: "Dr. Nolan",
    rating: 4,
    type: "top",
    category: "History",
  },
  {
    title: "Advanced Chemistry",
    author: "Linda Ray",
    rating: 5,
    type: "all",
    category: "Academic",
  },
];

const BookShelf = () => {
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const typeFilters = ["all", "latest", "top"];
  const categoryFilters = ["Fiction", "History", "Academic"];

  const filteredBooks = books.filter(
    (book) =>
      (filter === "all" || book.type === filter) &&
      (!category || book.category === category) &&
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCategoryClick = (btn) => {
    // Toggle category. If clicked again, deselect.
    if (category === btn) {
      setCategory("");
    } else {
      setCategory(btn);
    }
    // Always reset type filter when selecting a category
    setFilter("all");
  };

  return (
    <div className="bg-white h-screen overflow-y-scroll scrollbar-hide">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300 px-4 pt-4 pb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap">
          {/* Type Filters */}
          <div className="flex gap-2 flex-wrap">
            {typeFilters.map((btn) => (
              <button
                key={btn}
                className={`px-4 py-1.5 rounded-full capitalize ${
                  filter === btn
                    ? "bg-red-400 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setFilter(btn)}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            {categoryFilters.map((btn) => (
              <button
                key={btn}
                className={`px-4 py-1.5 rounded-full capitalize ${
                  category === btn
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleCategoryClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="flex flex-wrap gap-6 p-4">
        {filteredBooks.map((book, index) => (
          <BookMockup
            key={index}
            title={book.title}
            author={book.author}
            rating={book.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
