import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ReviewForm from '../components/ReviewForm';
import BookService from '../services/BookService';
import ReviewService from '../services/ReviewService';

const BookDetailsPage = ({ match }) => {
    const { bookId } = match.params;
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        BookService.fetchBookById(bookId)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => console.log('Error fetching book details:', error));

        ReviewService.getReviewsForBook(bookId)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => console.log('Error fetching reviews:', error));
    }, [bookId]);

    const handleReviewSubmit = (reviewData) => {
        ReviewService.addReview(bookId, reviewData)
            .then(response => {
                setReviews([...reviews, response.data]);
            })
            .catch(error => console.log('Error posting review:', error));
    };

    return (
        <div>
            <Navbar />
            <h1>Book Details</h1>
            {book && (
                <div>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <ReviewForm onSubmit={handleReviewSubmit} />
                    <h3>Reviews</h3>
                    {reviews.map(review => (
                        <div key={review.id}>
                            <p>{review.comment}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookDetailsPage;
