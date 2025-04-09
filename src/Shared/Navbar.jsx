import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#1E555C] text-white py-3 shadow-md w-full fixed top-0 left-0 z-50">
            <style>
                {`
                    @keyframes slowBounce {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }
                    .slow-bounce {
                        animation: slowBounce 2s infinite;
                    }
                `}
            </style>

            <div className="flex justify-between items-center px-4">
                <Link
                    to="/"
                    className="text-2xl font-bold slow-bounce hover:animate-none transition"
                >
                    📚 Book App
                </Link>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Links for large screens */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-black transition font-semibold">Book Details</Link>
                    <Link to="/wishlist" className="hover:text-black transition font-semibold">Wishlist</Link>
                </div>
            </div>

            {/* Smooth Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 space-y-2 pt-2">
                    <Link to="/" className="block hover:text-black transition font-semibold">Book Details</Link>
                    <Link to="/wishlist" className="block hover:text-black transition font-semibold">Wishlist</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
