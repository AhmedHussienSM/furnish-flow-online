
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="h-64 overflow-hidden relative group">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.bestseller && (
            <span className="absolute top-3 left-3 bg-furniture-primary text-white text-xs px-2 py-1 rounded">
              Bestseller
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Almost gone
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill={index < Math.floor(product.rating) ? "#D4AF37" : "none"}
                  color={index < Math.floor(product.rating) ? "#D4AF37" : "#D1D5DB"}
                  className="mr-0.5"
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-furniture-primary">${product.price.toFixed(2)}</p>
            <div className="flex gap-1">
              {product.availableColors.slice(0, 3).map(color => (
                <div
                  key={color.id}
                  style={{ backgroundColor: color.value }}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  title={color.name}
                ></div>
              ))}
              {product.availableColors.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-gray-100 text-xs flex items-center justify-center text-gray-500">
                  +{product.availableColors.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
