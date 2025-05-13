
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-furniture-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-medium mb-6">Elegance Home</h3>
            <p className="text-gray-300 mb-6">
              Discover premium furniture designed for modern living. Quality craftsmanship with timeless style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-furniture-accent" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-furniture-accent" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-furniture-accent" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-furniture-accent" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/living-room" className="text-gray-300 hover:text-white transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link to="/category/bedroom" className="text-gray-300 hover:text-white transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link to="/category/dining-room" className="text-gray-300 hover:text-white transition-colors">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link to="/category/office" className="text-gray-300 hover:text-white transition-colors">
                  Office
                </Link>
              </li>
              <li>
                <Link to="/category/outdoor" className="text-gray-300 hover:text-white transition-colors">
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-white transition-colors">
                  Product Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Furniture Avenue<br />
                  Seattle, WA 98101
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2" />
                <a href="tel:+12065551234" className="text-gray-300 hover:text-white">
                  (206) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2" />
                <a href="mailto:info@elegancehome.com" className="text-gray-300 hover:text-white">
                  info@elegancehome.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8 pb-4">
          <div className="max-w-lg mx-auto text-center">
            <h4 className="font-serif text-lg font-medium mb-3">Subscribe to Our Newsletter</h4>
            <p className="text-gray-300 mb-4">Stay updated with our latest collections and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-furniture-accent"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-furniture-primary text-white rounded-md hover:bg-furniture-accent transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Elegance Home. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-gray-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
