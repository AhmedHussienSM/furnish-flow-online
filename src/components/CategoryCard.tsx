
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.slug}`} 
      className="block group"
    >
      <div className="category-image rounded-lg overflow-hidden relative h-72 md:h-80">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h3 className="font-serif text-white text-2xl font-medium mb-1 group-hover:text-furniture-accent transition-colors">
            {category.name}
          </h3>
          <p className="text-white text-sm mb-2 opacity-90">
            {category.count} items
          </p>
          <span className="inline-block text-white text-sm font-medium border-b border-furniture-accent pb-1 group-hover:border-white transition-colors">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
