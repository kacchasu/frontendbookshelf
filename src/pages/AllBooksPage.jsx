import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/bookSlice';
import { fetchCategories, fetchBooksByCategoryId } from '../store/categorySlice';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import BookDetail from '../components/BookDetail';
import bookService from '../services/bookService';

function AllBooksPage() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books || []);
    const categories = useSelector((state) => state.categories.categories || []);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showBookForm, setShowBookForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksResponse = await bookService.getAllBooks();
                dispatch(fetchBooks(booksResponse));
                dispatch(fetchCategories());
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const fetchBooksForCategories = async () => {
            if (selectedCategories.length === 0) {
                setFilteredBooks(books);
                return;
            }

            try {
                const promises = selectedCategories.map((categoryId) =>
                    dispatch(fetchBooksByCategoryId(categoryId))
                );
                const results = await Promise.all(promises);

                const combinedBooks = [];
                results.forEach(result => {
                    result.payload.forEach(book => {
                        if (!combinedBooks.some(b => b.id === book.id)) {
                            combinedBooks.push(book);
                        }
                    });
                });

                setFilteredBooks(combinedBooks);
            } catch (error) {
                console.error('Failed to fetch books for selected categories:', error);
            }
        };

        fetchBooksForCategories();
    }, [selectedCategories, books, dispatch]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

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
                            value={category.id}
                            onChange={() => handleCategoryChange(category.id)}
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
                <BookForm onClose={() => setShowBookForm(false)} />
            )}
            {selectedBook && (
                <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
            )}
        </div>
    );
}

export default AllBooksPage;
