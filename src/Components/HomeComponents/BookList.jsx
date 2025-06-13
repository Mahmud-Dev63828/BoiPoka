import BookMockup from "../CommonComponent/BookMockup";

const BookList = () => {
  const topBooks = [
    { title: "Fantastic Beasts", author: "J.K. Rowling", rating: 4 },
    { title: "The Wise Man's Fear", author: "Patrick Rothfuss", rating: 5 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", rating: 3 },
    { title: "The Ice and Fire", author: "George R. R. Martin", rating: 2 },
    { title: "Game of Thrones", author: "George R. R. Martin", rating: 5 },
  ];

  return (
    <div className="md:w-1/2 w-full px-4 pt-6 bg-white rounded-xl">
      <h2 className="text-md font-bold mb-3 text-gray-800">Top Reads</h2>
      <div className="flex gap-4 flex-wrap">
        {topBooks.map((book, idx) => (
          <BookMockup
            key={idx}
            title={book.title}
            author={book.author}
            rating={book.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
