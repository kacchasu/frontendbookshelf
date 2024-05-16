import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';

function CategorySelector({ selectedCategories, setSelectedCategories }) {
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

    return (
        <div className="category-selector">
            <h4>Filter by Categories:</h4>
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
    );
}

export default CategorySelector;
