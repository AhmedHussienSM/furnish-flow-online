
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/mockData';

const Navbar = () => {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 font-serif text-xl md:text-2xl font-bold text-furniture-primary">
            Elegance Home
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-furniture-primary font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-furniture-primary font-medium flex items-center gap-1">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-furniture-secondary hover:text-furniture-primary"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/products" className="text-gray-700 hover:text-furniture-primary font-medium">
              All Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-furniture-primary font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-furniture-primary font-medium">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-700 hover:text-furniture-primary"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link to="/account" className="p-2 text-gray-700 hover:text-furniture-primary hidden md:block">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-furniture-primary hidden md:block">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="p-2 text-gray-700 hover:text-furniture-primary relative">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-furniture-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-3 border-t animate-fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-2 pl-10 border-2 border-gray-200 rounded-md focus:outline-none focus:border-furniture-primary"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <details className="group">
                <summary className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md list-none flex justify-between items-center cursor-pointer">
                  Categories
                  <span className="text-xs">▼</span>
                </summary>
                <div className="pl-6 pt-2 pb-1 space-y-1">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-furniture-secondary rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </details>
              <Link to="/products" className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                All Products
              </Link>
              <Link to="/about" className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/contact" className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/account" className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                My Account
              </Link>
              <Link to="/wishlist" className="px-3 py-2 text-gray-700 hover:bg-furniture-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Wishlist
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
