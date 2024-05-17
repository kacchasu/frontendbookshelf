import React, { useState } from 'react';
import bookService from '../services/bookService';

function BookForm({ onClose }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            title,
            author,
            imageUrl,
            description,
            categories: categories.map((cat) => ({ name: cat }))
        };
        try {
            await bookService.saveBook(newBook);
            onClose();
        } catch (error) {
            console.error('Failed to save book:', error);
        }
    };

    return (
        <div className="book-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Author:
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </label>
                <label>
                    Image URL:
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Categories:
                    <input
                        type="text"
                        value={categories.join(', ')}
                        onChange={(e) => setCategories(e.target.value.split(',').map((cat) => cat.trim()))}
                    />
                </label>
                <button type="submit">Add Book</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
}

export default BookForm;
