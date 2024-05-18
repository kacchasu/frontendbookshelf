import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/bookSlice';
import { fetchCategories } from '../store/categorySlice';
import { fetchBookshelves, addBookToBookshelf } from '../store/bookshelfSlice';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import BookDetail from '../components/BookDetail';

const AllBooksPage = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const categories = useSelector((state) => state.categories.categories);
    const { myBookshelves, sharedBookshelves } = useSelector((state) => state.bookshelves);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showBookForm, setShowBookForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showAddToBookshelf, setShowAddToBookshelf] = useState(false);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchCategories());
        const userId = 1; // Replace with actual user ID
        dispatch(fetchBookshelves(userId));
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
        book.categories.some((category) => selectedCategories.includes(category.name))
    );

    const handleBookCardClick = (book) => {
        setSelectedBook(book);
    };

    const handleAddToBookshelf = (book) => {
        setSelectedBook(book);
        setShowAddToBookshelf(true);
    };

    const handleAddBookToBookshelf = () => {
        if (selectedBookshelf && selectedBook) {
            dispatch(addBookToBookshelf({ bookshelfId: selectedBookshelf.id, bookId: selectedBook.id }));
            setShowAddToBookshelf(false);
            setSelectedBookshelf(null);
            setSelectedBook(null);
        }
    };

    return (
        <div className="all-books-page">
            <div className="sidebar">
                <h2>Categories</h2>
                <div className="category-selector">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`category-item ${selectedCategories.includes(category.name) ? 'selected' : ''}`}
                            onClick={() => handleCategoryChange(category.name)}
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
                <button className="add-book-button" onClick={() => setShowBookForm(true)}>
                    Add Book
                </button>
            </div>
            <div className="book-grid">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} onClick={() => handleBookCardClick(book)} onAddToBookshelf={() => handleAddToBookshelf(book)} />
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
            {showAddToBookshelf && (
                <div className="add-to-bookshelf">
                    <h2>Add {selectedBook.title} to a Bookshelf</h2>
                    <select onChange={(e) => setSelectedBookshelf(JSON.parse(e.target.value))}>
                        <option value="">Select a Bookshelf</option>
                        {myBookshelves.map((bookshelf) => (
                            <option key={bookshelf.id} value={JSON.stringify(bookshelf)}>
                                {bookshelf.name}
                            </option>
                        ))}
                        {sharedBookshelves.map((bookshelf) => (
                            <option key={bookshelf.id} value={JSON.stringify(bookshelf)}>
                                {bookshelf.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddBookToBookshelf}>Add to Bookshelf</button>
                    <button onClick={() => setShowAddToBookshelf(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AllBooksPage;
