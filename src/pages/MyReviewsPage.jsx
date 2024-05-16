import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../store/reviewSlice';

function MyReviewsPage() {
    const [ratingFilter, setRatingFilter] = useState(null);
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);

    useEffect(() => {
        if (ratingFilter !== null) {
            dispatch(fetchReviews(ratingFilter));
        }
    }, [dispatch, ratingFilter]);

    return (
        <div>
            <h1>My Reviews</h1>
            <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} onClick={() => setRatingFilter(rating)}>
                        {rating} Stars
                    </button>
                ))}
            </div>
            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <h3>{review.book.title}</h3>
                        <p>{review.comment}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyReviewsPage;
