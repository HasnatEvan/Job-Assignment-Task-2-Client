import React, { useState, useEffect } from 'react';
import BooksCard from './BooksCard';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9; // প্রতি পেজে কয়টা বই

    useEffect(() => {
        fetch('https://gutendex.com/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // All genres
    const genres = ['All', ...new Set(books.map(book => book.subjects?.[0] || 'Unknown'))];

    // Filtered books
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = selectedGenre === 'All' || (book.subjects?.[0] === selectedGenre);
        return matchesSearch && matchesGenre;
    });

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='bg-white min-h-screen'>
            <h2 className="text-3xl font-semibold text-center mt-6 mb-4 text-black">All Books Collection</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-6 mb-6">
                <input
                    type="text"
                    placeholder="Search by book title..."
                    className="input input-bordered w-full md:w-1/2"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on filter change
                    }}
                />

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={selectedGenre}
                    onChange={(e) => {
                        setSelectedGenre(e.target.value);
                        setCurrentPage(1); // Reset to page 1 on filter change
                    }}
                >
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>

            {/* Spinner or Books */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-bars loading-xl"></span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6">
                        {currentBooks.length > 0 ? (
                            currentBooks.map((book) => (
                                <BooksCard key={book.id} book={book} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-3">No books found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 flex-wrap gap-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllBooks;
