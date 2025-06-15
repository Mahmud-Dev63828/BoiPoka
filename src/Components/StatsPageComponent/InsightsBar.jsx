import React from "react";
import InsightCard from "../CommonComponent/InsightCard";

const InsightsBar = () => {
  const statsData = [
    {
      title: "Weekly Reads",
      pages: 120,
      books: 1,
      pageUnit: "Pages",
      bookUnit: "Books",
      width: "48%",
      height: "18dvh",
      onViewClick: () => alert("Weekly Reads Insights Clicked"),
    },
    {
      title: "Monthly Reads",
      pages: 450,
      books: 3,
      pageUnit: "Pages Read",
      bookUnit: "Total Books",
      width: "48%",
      height: "18dvh",
      onViewClick: () => alert("Monthly Reads Insights Clicked"),
    },
    {
      title: "Yearly Reads",
      pages: 5200,
      books: 36,
      pageUnit: "Pages Finished",
      bookUnit: "Books Read",
      width: "48%",
      height: "18dvh",
      onViewClick: () => alert("Yearly Reads Insights Clicked"),
    },
    {
      title: "Lifetime Reads",
      pages: 13200,
      books: 102,
      pageUnit: "Pages Done",
      bookUnit: "All Books",
      width: "48%",
      height: "18dvh",
      onViewClick: () => alert("Lifetime Reads Insights Clicked"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {statsData.map((data, idx) => (
        <InsightCard key={idx} {...data} />
      ))}
    </div>
  );
};

export default InsightsBar;
