import React from 'react';

function BookCard({ book, onClick, onAddToBookshelf }) {
    return (
        <div className="book-card" onClick={onClick}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={onAddToBookshelf}>Add to Bookshelf</button>
        </div>
    );
}

export default BookCard;
