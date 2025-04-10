import React, { useEffect, useState } from 'react';
import BooksCard from '../Home/AllBooks/BooksCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(6);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    const handleRemoveFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter(book => book.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = wishlist.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(wishlist.length / booksPerPage);

    return (
        <div className="bg-white min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-8">
            <h2 className="text-3xl font-semibold text-center mb-8 text-black">Your Wishlist</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <BooksCard
                            key={book.id}
                            book={book}
                            isWishlistPage={true}
                            onRemove={handleRemoveFromWishlist}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No books in your wishlist yet.</p>
                )}
            </div>

            {wishlist.length > booksPerPage && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === index + 1
                                    ? 'bg-blue-600 text-white font-medium'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
