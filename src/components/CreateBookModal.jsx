import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';

function CreateBookModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategories();
                setCategories(response);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, author, categories: selectedCategories });
        setTitle('');
        setAuthor('');
        setSelectedCategories([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Book</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Author:
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </label>
                    <div>
                        <h4>Categories:</h4>
                        {categories.map((category) => (
                            <label key={category.id}>
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                    <button type="submit">Create</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateBookModal;
