import React from 'react';
import Link from 'next/link';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineLogin } from 'react-icons/ai';
import { FaSlidersH } from 'react-icons/fa'; 

interface NavbarProps {
  onFilterClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterClick }) => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="text-gray-700 hover:text-gray-900 focus:outline-none" onClick={onFilterClick}>
            <FaSlidersH size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/favorites" className="text-gray-700 hover:text-gray-900 flex items-center space-x-1">
            <AiOutlineHeart size={20} />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-gray-900 flex items-center space-x-1">
            <AiOutlineShoppingCart size={20} />
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-gray-900 flex items-center space-x-1">
            <AiOutlineLogin size={20} />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

