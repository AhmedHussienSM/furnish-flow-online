
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section h-[70vh] flex items-center justify-center text-center text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            Furniture That Defines Your Style
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto">
            Discover premium quality pieces designed for modern living
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-furniture-primary hover:bg-furniture-accent text-white px-8 py-3 rounded-md transition-colors font-medium"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-furniture-dark px-8 py-3 rounded-md transition-colors font-medium"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
