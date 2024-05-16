import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/bookSlice';
import { fetchCategories } from '../store/categorySlice';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import BookDetail from '../components/BookDetail';

function AllBooksPage() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books || []);
    const categories = useSelector((state) => state.categories.categories || []);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showBookForm, setShowBookForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredBooks = books.filter((book) =>
        selectedCategories.length === 0 ||
        book.bookCategories.some((bc) => selectedCategories.includes(bc.category.name))
    );

    const handleBookCardClick = (book) => {
        setSelectedBook(book);
    };

    return (
        <div>
            <h1>All Books</h1>
            <div>
                {categories.map((category) => (
                    <label key={category.id}>
                        <input
                            type="checkbox"
                            value={category.name}
                            onChange={() => handleCategoryChange(category.name)}
                        />
                        {category.name}
                    </label>
                ))}
            </div>
            <button onClick={() => setShowBookForm(true)}>Add Book</button>
            <div className="book-grid">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} onClick={() => handleBookCardClick(book)} />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
            {showBookForm && (
                <BookForm
                    onClose={() => setShowBookForm(false)}
                />
            )}
            {selectedBook && (
                <BookDetail
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </div>
    );
}

export default AllBooksPage;
