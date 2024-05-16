import React from 'react';
import ReviewForm from './ReviewForm';

function BookDetail({ book, onClose }) {
    // Use optional chaining (?.) and nullish coalescing (??) to handle undefined properties
    const categories = book.categories ?? [];
    const reviews = book.reviews ?? [];

    return (
        <div className="book-detail">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            {book.imageLink && <img src={book.imageLink} alt={book.title} />}
            <p>{book.description}</p>
            <p>Categories: {categories.map((cat) => cat.name).join(', ')}</p>
            <p>Rating: {book.rating}</p>
            <button onClick={onClose}>Close</button>
            <ReviewForm bookId={book.id} />
            <div className="reviews">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-item">
                            <p>Username: {review.username}</p>
                            <p>Comment: {review.comment}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
}

export default BookDetail;
