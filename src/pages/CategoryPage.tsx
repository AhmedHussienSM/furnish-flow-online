import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { api } from '../lib/api';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const categories = await api.getAllCategories();
        const foundCategory = categories.find(c => c.slug === slug);
        setCategory(foundCategory || null);
        
        if (foundCategory) {
          const products = await api.getProductsByCategory(foundCategory.id);
          setCategoryProducts(products);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load category data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-furniture-secondary flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading category...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-furniture-secondary flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-md">
          <h3 className="font-serif text-xl font-medium mb-2 text-red-600">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-furniture-primary text-white rounded-md hover:bg-furniture-accent transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-furniture-secondary py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-6">Category Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-furniture-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">{category.name}</h1>
          <p className="text-gray-600 max-w-3xl">{category.description}</p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="font-serif text-2xl font-medium mb-4">No products found</h2>
            <p className="text-gray-600">
              We don't have any products in this category at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
