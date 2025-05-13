
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/mockData';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  // Get only featured products
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 md:mb-0">
            Featured Furniture
          </h2>
          <Link 
            to="/products" 
            className="text-furniture-primary hover:text-furniture-accent font-medium"
          >
            View All Products →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
