import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/CommonComponent/Sidebar";
import CommonLayout from "./Components/CommonLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={"home"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
