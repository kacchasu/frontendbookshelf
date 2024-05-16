import React from 'react';

function BookCard({ book, onClick }) {
    return (
        <div className="book-card" onClick={onClick}>
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>Categories: {book.bookCategories.map((bc) => bc.category.name).join(', ')}</p>
            <p>Rating: {book.reviews.length > 0 ? (book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length) : 'No reviews yet'}</p>
        </div>
    );
}

export default BookCard;
