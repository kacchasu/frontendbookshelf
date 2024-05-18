import React from 'react';

function BookCard({ book, onClick, onAddToBookshelf, isSelected }) {
    return (
        <div className={`book-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={onAddToBookshelf}>Add to Bookshelf</button>
        </div>
    );
}

export default BookCard;
