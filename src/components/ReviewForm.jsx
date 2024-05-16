import React, { useState } from 'react';

function ReviewForm({ bookId, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ bookId, rating, comment });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Rating:
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            </label>
            <label>
                Comment:
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ReviewForm;
