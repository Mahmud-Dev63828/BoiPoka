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
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<BookStore />} />
          <Route path="/bookmarks" element={<AddBook />} />
          <Route path="/calender" element={<CalendarPopup />} />
          <Route path="/bookdetails" element={<BookDetails />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
