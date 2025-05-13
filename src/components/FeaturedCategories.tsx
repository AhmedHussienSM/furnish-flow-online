
import React from 'react';
import { categories } from '../data/mockData';
import CategoryCard from './CategoryCard';

const FeaturedCategories = () => {
  // Select first 3 categories to display
  const featuredCategories = categories.slice(0, 3);

  return (
    <section className="py-16 bg-furniture-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-3">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover beautifully crafted furniture for every room in your home
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
