const InsightCard = ({ title, pages, books }) => {
  return (
    <div className="flex flex-col bg-red-50 border border-red-100 rounded-xl shadow p-3 w-[48%] h-fit">
      <div className="w-2.5 h-2.5 bg-red-400 rounded-full mb-1" />
      <h2 className="text-sm text-gray-700 font-medium">{title}</h2>
      <p className="text-lg font-bold text-gray-900 leading-5">{pages} Pages</p>
      <p className="text-xs text-gray-600 leading-4">{books} Books</p>
      <div className="mt-2 text-xs text-red-500 hover:underline cursor-pointer">
        View Insights
      </div>
    </div>
  );
};

const Insights = () => {
  const insights = [
    { title: "Weekly Reads", pages: 120, books: 1 },
    { title: "Monthly Reads", pages: 450, books: 3 },
    { title: "Yearly Reads", pages: 5200, books: 36 },
    { title: "Lifetime Reads", pages: 13200, books: 102 },
  ];

  return (
    <div className="w-full md:w-1/2 px-4 py-2 flex flex-wrap gap-4 justify-between">
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
