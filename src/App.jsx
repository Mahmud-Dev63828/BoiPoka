import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/CommonComponent/Sidebar";
import CommonLayout from "./Components/CommonLayout";
import Home from "./Pages/Home";
import BookStore from "./Pages/BookStore";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<BookStore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
