import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ review, rating });
        setReview('');
        setRating(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={review} onChange={e => setReview(e.target.value)} />
            <select value={rating} onChange={e => setRating(e.target.value)}>
                {[1, 2, 3, 4, 5].map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
