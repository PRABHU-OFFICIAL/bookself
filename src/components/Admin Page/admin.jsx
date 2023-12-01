import React, { useState, useEffect } from "react";
import "./admin.css";
import BookDetailsPopup from "../Book Details/BookDetailsPopup.jsx";

const AdminPage = () => {
  const defaultBookImage = "./book.jpg";

  const [bookDetails, setBookDetails] = useState({
    bookName: "",
    ISBN: "",
    category: "",
    rowNo: "",
    bookCount: 0,
    cost: 0,
    availability: true,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [error, setError] = useState("");
  const [storedBooks, setStoredBooks] = useState([]);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
    setStoredBooks(existingBooks);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAddBook = () => {
    // Check if any of the required fields are empty
    if (
      !bookDetails.bookName ||
      !bookDetails.ISBN ||
      !bookDetails.category ||
      !bookDetails.rowNo ||
      bookDetails.bookCount <= 0 ||
      bookDetails.cost <= 0
    ) {
      setError(
        "All fields must be filled, and numeric fields must be greater than 0"
      );
      return;
    }

    try {
      const existingBooks = JSON.parse(localStorage.getItem("books")) || [];
      const updatedBooks = [...existingBooks, bookDetails];
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      setStoredBooks(updatedBooks);
      setError(""); // Clear any previous error

      setBookDetails({
        bookName: "",
        ISBN: "",
        category: "",
        rowNo: "",
        bookCount: 0,
        cost: 0,
        availability: true,
      });

      console.log("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  const handleEditBook = (index) => {
    // Set the selected book for editing
    setSelectedBookIndex(index);

    // Pre-fill the form with the selected book details
    setBookDetails(storedBooks[index]);
  };

  const handleRemoveBook = (index) => {
    try {
      const updatedBooks = [...storedBooks];
      updatedBooks.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      setStoredBooks(updatedBooks);
      setSelectedBookIndex(null); // Clear the selected book index

      console.log("Book removed successfully!");
    } catch (error) {
      console.error("Error removing book:", error.message);
    }
  };

  const handleCancelEdit = () => {
    // Clear the selected book for editing
    setSelectedBookIndex(null);

    // Reset the form
    setBookDetails({
      bookName: "",
      ISBN: "",
      category: "",
      rowNo: "",
      bookCount: 0,
      cost: 0,
      availability: true,
    });
  };

  const handleUpdateBook = () => {
    try {
      const updatedBooks = [...storedBooks];
      updatedBooks[selectedBookIndex] = bookDetails;
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      setStoredBooks(updatedBooks);
      setSelectedBookIndex(null); // Clear the selected book index

      setBookDetails({
        bookName: "",
        ISBN: "",
        category: "",
        rowNo: "",
        bookCount: 0,
        cost: 0,
        availability: true,
      });

      console.log("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = storedBooks.filter(
    (book) =>
      String(book.ISBN).toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowDetails = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
  };

  return (
    <div className="admin-container">
      <main className="admin-main">
        <h1 style={{ textAlign: "center" }}>Welcome to the Admin Dashboard</h1>

        {/* Add Book Form */}
        <form className="add-book-form">
          <label>
            Book Name:
            <input
              type="text"
              name="bookName"
              value={bookDetails.bookName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            ISBN:
            <input
              type="text"
              name="ISBN"
              value={bookDetails.ISBN}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={bookDetails.category}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Row No.:
            <input
              type="text"
              name="rowNo"
              value={bookDetails.rowNo}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Book Count:
            <input
              type="number"
              name="bookCount"
              value={bookDetails.bookCount}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Cost:
            <input
              type="number"
              name="cost"
              value={bookDetails.cost}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Availability:
            <input
              type="checkbox"
              name="availability"
              checked={bookDetails.availability}
              onChange={() =>
                setBookDetails((prevDetails) => ({
                  ...prevDetails,
                  availability: !prevDetails.availability,
                }))
              }
            />
          </label>
          <button type="button" onClick={handleAddBook}>
            Add Book
          </button>
          {error && <p className="error-message">{error}</p>}
          <div>
            {/* Render "Update Book" and "Cancel" buttons when editing */}
            {selectedBookIndex !== null && (
              <>
                <button type="button" onClick={handleUpdateBook}>
                  Update Book
                </button>
                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Display Stored Books */}
        <div className="stored-books">
          <h2>Stored Books</h2>
          <div className="stored-books-grid">
            {filteredBooks.map((book, index) => (
              <li
                key={index}
                onClick={() => handleShowDetails(book)}
                style={{ listStyleType: "none" }}
              >
                <div className="book-entry">
                  <img src={defaultBookImage} alt="Book Cover" width={200} />
                  <div className="book-details">
                    <strong>{book.bookName}</strong>
                    <p>ISBN: {book.ISBN}</p>
                    <p>Category: {book.category}</p>
                    {/* Add other book details here */}
                    <span
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleEditBook(index)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveBook(index)}
                      >
                        Remove
                      </button>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </main>
      {/* Book Details Popup */}
      {showPopup && (
        <BookDetailsPopup book={selectedBook} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default AdminPage;
