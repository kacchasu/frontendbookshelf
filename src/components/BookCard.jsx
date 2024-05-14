import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white shadow-md rounded p-4">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button className="bg-blue-500 text-white rounded px-4 py-2 mt-2">View Details</button>
        </div>
    );
};

export default BookCard;
