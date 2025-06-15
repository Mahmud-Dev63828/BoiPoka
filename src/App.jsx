import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/CommonComponent/Sidebar";
import CommonLayout from "./Components/CommonLayout";
import Home from "./Pages/Home";
import BookStore from "./Pages/BookStore";
import Insights from "./Components/HomeComponents/Insights";
import CalendarPopup from "./Components/CommonComponent/CalendarPopup";
import AddBook from "./Pages/AddBook";
import BookDetails from "./Components/CommonComponent/BookDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<BookStore />} />
          <Route path="/stats" element={<Insights />} />
          <Route path="/bookmarks" element={<AddBook />} />
          <Route path="/calender" element={<CalendarPopup />} />
          <Route path="/bookdetails" element={<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
