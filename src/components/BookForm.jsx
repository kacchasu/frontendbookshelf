import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveBook } from '../store/bookSlice';

function BookForm({ onClose }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            title,
            author,
            imageUrl,
            description,
            categories: categories.split(',').map((cat) => ({ name: cat.trim() })),
        };
        try {
            await dispatch(saveBook(newBook)).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to save book:', error);
        }
    };

    return (
        <div className="book-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Book Name:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Author:
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </label>
                <label>
                    Link to Image:
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </label>
                <label>
                    Categories (comma-separated):
                    <input
                        type="text"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Book</button>
                <button type="button" onClick={onClose}>Close</button>
            </form>
        </div>
    );
}

export default BookForm;
