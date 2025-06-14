import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const options = ["Fiction", "Academic", "Non Fiction"];

const SelectDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange({ target: { name: "category", value: option } });
    setOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer bg-white focus:ring-2 focus:ring-red-400"
      >
        <span className="text-gray-700">{value}</span>
        <FaChevronDown className="text-gray-500" />
      </div>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-red-100 ${
                value === option ? "bg-red-400 text-white font-medium" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
