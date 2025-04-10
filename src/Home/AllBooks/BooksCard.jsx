import React, { useEffect, useState } from 'react';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BooksCard = ({ book, isWishlistPage, onRemove }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showCard, setShowCard] = useState(false); // fade-in animation

    const authorName = book.authors?.[0]?.name || 'Unknown Author';
    const genre = book.subjects?.[0] || 'No Genre Available';
    const coverImage = book.formats?.['image/jpeg'] || 'https://via.placeholder.com/150';

    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (!isWishlisted) {
            storedWishlist.push(book);
            localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
        } else {
            const updated = storedWishlist.filter(item => item.id !== book.id);
            localStorage.setItem('wishlist', JSON.stringify(updated));
        }
    };

    const handleRemove = (e) => {
        e.preventDefault();
        if (onRemove) {
            onRemove(book.id);
        }
    };

    return (
        <Link to={`/book/${book.id}`}>
            <div
                className={`flex flex-col justify-between p-4 rounded-lg bg-white h-full 
                transform transition-all duration-500 ease-in-out 
                ${showCard ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
                hover:-translate-y-2 hover:shadow-xl shadow-md`}
            >
                <div className="overflow-hidden rounded-md">
                    <img
                        src={coverImage}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="mt-4 flex-grow">
                    <h3 className="text-xl font-semibold text-black mb-2">{book.title}</h3>
                    <p className="text-sm text-gray-500">Author: {authorName}</p>
                    <p className="text-sm text-gray-500">Genre: {genre}</p>
                    <p className="text-sm text-gray-500">ID: {book.id}</p>
                </div>

                {isWishlistPage ? (
                    <button
                        onClick={handleRemove}
                        className="mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-transform duration-300 hover:scale-105"
                    >
                        <FaTrash />
                        Remove from Wishlist
                    </button>
                ) : (
                    <button
                        onClick={handleWishlistClick}
                        className={`mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium 
                        transition-transform duration-300 hover:scale-105 
                        ${isWishlisted
                            ? 'bg-red-600 text-white'
                            : 'bg-[#1E555C] text-white hover:bg-[#174347]'
                        }`}
                    >
                        <FaHeart />
                        {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                    </button>
                )}
            </div>
        </Link>
    );
};

export default BooksCard;
