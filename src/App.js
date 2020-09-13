import React, { useState } from 'react';
import CartContext from './contexts/cartContext';
import Navbar from './components/Navbar';
import BooksList from './components/BooksList';
import booksOriginal from './books.json';

// Add price(100.00) and id(index) to all books on original list
booksOriginal.map((book, index) => {
  const price = 100.00;
  booksOriginal[index] = { ...book, price, id: index };
});

function App() {
  const [cart, setCart] = useState([]);
  const [booksList, setBooksList] = useState(booksOriginal);

  const searchBooks = (title) => {
    const newBooksList = [];
    // Search for title in books array
    booksOriginal.map((book) => {
      // Verify if the book title cotain the title wanted by user
      if (book.title.toLowerCase().includes(title.toLowerCase())) {
        newBooksList.push(book);
      }
    });

    // Update books list state with the new books list
    setBooksList(newBooksList);
  };

  return (
    <div className="App">
      <CartContext.Provider value={[cart, setCart]}>
        <Navbar searchBooks={searchBooks} />
        <BooksList booksList={booksList} />
      </CartContext.Provider>
    </div>
  );
}

export default App;
