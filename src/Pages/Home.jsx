import React from "react";
import Banner from "../Components/HomeComponents/Banner";
import Insights from "../Components/HomeComponents/Insights";
import BookList from "../Components/HomeComponents/BookList";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="flex">
        <Insights />
        <BookList />
      </div>
    </div>
  );
};

export default Home;
