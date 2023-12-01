// BookDetailsPopup.js

import React from "react";
import QRCode from "qrcode.react";
import "./BookDetailsPopup.css";

const BookDetailsPopup = ({ book, onClose }) => {
  const bookDetailsText = `
    Book Name: ${book.bookName}
    ISBN: ${book.ISBN}
    Category: ${book.category}
    Row No: ${book.rowNo}
    Book Count: ${book.bookCount}
    Cost: ${book.cost}
    Availability: ${book.availability ? "Available" : "Not Available"}
  `;

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code-canvas");
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = image;
    link.download = "book_qr_code.png";
    link.click();
  };

  return (
    <div className="book-details-popup">
      <div className="popup-content">
        <div className="details">
          <h2>{book.bookName}</h2>
          <p>
            <strong>ISBN:</strong> {book.ISBN}
          </p>
          <p>
            <strong>Category:</strong> {book.category}
          </p>
          <p>
            <strong>Row No:</strong> {book.rowNo}
          </p>
          <p>
            <strong>Book Count:</strong> {book.bookCount}
          </p>
          <p>
            <strong>Cost:</strong> {book.cost}
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            {book.availability ? "Available" : "Not Available"}
          </p>
          {/* Add other book details here */}
          <button onClick={onClose}>Close</button>
        </div>
        <div className="qr-code">
          <QRCode id="qr-code-canvas" value={bookDetailsText} size={100} />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPopup;
