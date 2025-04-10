import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams();  
    const [book, setBook] = useState(null);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('wishlist')) || [];
        const selectedBook = storedBooks.find((book) => book.id === parseInt(id));
        setBook(selectedBook);
    }, [id]);

    if (!book) return <div className="text-center mt-10 text-lg">Loading...</div>;

    return (
        <div className="px-4 py-6 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">{book.title}</h1>
            <p className="text-lg mb-2 text-center">Author: {book.authors?.[0]?.name || 'Unknown Author'}</p>
            <img
                src={book.formats?.['image/jpeg'] || 'https://via.placeholder.com/150'}
                alt={book.title}
                className="w-32 h-48 md:w-48 md:h-72 object-cover rounded-lg mt-4 mx-auto"
            />
            <p className="mt-4 text-sm text-gray-600 text-center">Genre: {book.subjects?.[0] || 'No Genre Available'}</p>
            <p className="mt-1 text-sm text-gray-600 text-center">Language: {book.languages?.[0]}</p>
            <p className="mt-1 text-sm text-gray-600 text-center">Downloads: {book.download_count}</p>

            {book.summaries?.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2 text-center md:text-left">Summary:</h2>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">{book.summaries[0]}</p>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2 text-center md:text-left">Download Links:</h2>
                <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                    {Object.entries(book.formats).map(([format, link]) => {
                        if (!link.endsWith('.jpg')) {
                            return (
                                <li key={format}>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        {format}
                                    </a>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BookDetails;
