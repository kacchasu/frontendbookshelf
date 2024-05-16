import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';

function BookDetail({ book, onClose }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchBookCategories = async () => {
            try {
                const categoriesResponse = await categoryService.getCategoriesByBookId(book.id);
                setCategories(categoriesResponse.map(bc => bc.category));
            } catch (error) {
                console.error('Failed to fetch book categories:', error);
            }
        };

        fetchBookCategories();
    }, [book.id]);

    return (
        <div className="book-detail">
            <button onClick={onClose}>Close</button>
            <h2>{book.title}</h2>
            <img src={book.imageUrl} alt={book.title} style={{ width: '200px', height: '300px' }} />
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>Categories: {categories.map(category => category.name).join(', ')}</p>
            <p>Rating: {book.rating}</p>
            <div>
                <h3>Reviews</h3>
                {book.reviews.length > 0 ? (
                    book.reviews.map(review => (
                        <div key={review.id}>
                            <p>{review.user.username}: {review.text}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
}

export default BookDetail;
