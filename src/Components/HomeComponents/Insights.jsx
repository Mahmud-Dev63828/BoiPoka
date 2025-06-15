import InsightCard from "../CommonComponent/InsightCard";

const Insights = () => {
  const insights = [
    { title: "Weekly Reads", pages: 120, books: 1 },
    { title: "Monthly Reads", pages: 450, books: 3 },
    { title: "Yearly Reads", pages: 5200, books: 36 },
    { title: "Lifetime Reads", pages: 13200, books: 102 },
  ];

  return (
    <div className=" w-1/2 px-4 py-2 flex flex-wrap gap-4 justify-between">
      {insights.map((insight, idx) => (
        <InsightCard
          key={idx}
          title={insight.title}
          pages={insight.pages}
          books={insight.books}
        />
      ))}
    </div>
  );
};

export default Insights;
