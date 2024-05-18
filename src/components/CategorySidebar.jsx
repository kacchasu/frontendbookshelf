import React from 'react';

const CategorySidebar = ({ categories, selectedCategories, onCategoryChange }) => {
    return (
        <div className="category-sidebar">
            <h2>Categories</h2>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className={`category-item ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                    onClick={() => onCategoryChange(category.id)}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategorySidebar;
