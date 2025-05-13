
import React, { useState } from 'react';
import { products, categories, colors } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Product } from '../types';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [colorFilter, setColorFilter] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter and sort products
  const handleFilter = () => {
    let filtered = [...products];

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(p => p.categoryId === categoryFilter);
    }

    // Filter by color
    if (colorFilter) {
      filtered = filtered.filter(p => p.availableColors.some(c => c.id === colorFilter));
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'bestseller':
        filtered = filtered.sort((a, b) => {
          if (a.bestseller && !b.bestseller) return -1;
          if (!a.bestseller && b.bestseller) return 1;
          return 0;
        });
        break;
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    setFilteredProducts(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setCategoryFilter(null);
    setColorFilter(null);
    setPriceRange([0, 2000]);
    setSortBy('featured');
    setFilteredProducts(products);
  };

  // Handle price range change
  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  // Effect to apply filters
  React.useEffect(() => {
    handleFilter();
  }, [categoryFilter, colorFilter, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-furniture-secondary py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-6">All Products</h1>

        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-md bg-white"
          >
            <Filter size={18} className="mr-2" />
            <span>Filters & Sorting</span>
            {filtersOpen ? <ChevronUp size={18} className="ml-2" /> : <ChevronDown size={18} className="ml-2" />}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar - Hidden on mobile unless open */}
          <div className={`w-full lg:w-1/4 transition-all ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Filter header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-medium">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-furniture-primary hover:text-furniture-accent"
                >
                  Reset All
                </button>
              </div>

              {/* Categories filter */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={categoryFilter === category.id}
                        onChange={() => setCategoryFilter(category.id)}
                        className="mr-2 h-4 w-4 text-furniture-primary focus:ring-furniture-primary border-gray-300"
                      />
                      <label htmlFor={`category-${category.id}`} className="text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Colors filter */}
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color.id}
                      style={{ backgroundColor: color.value }}
                      className={`w-8 h-8 rounded-full hover:scale-110 transition-transform ${
                        colorFilter === color.id ? 'ring-2 ring-offset-2 ring-furniture-primary' : ''
                      }`}
                      title={color.name}
                      onClick={() => setColorFilter(colorFilter === color.id ? null : color.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="w-full lg:w-3/4">
            {/* Sorting and results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="mb-3 sm:mb-0 text-gray-600">{filteredProducts.length} products found</p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-furniture-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="bestseller">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {(categoryFilter !== null || colorFilter !== null) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {categoryFilter !== null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-furniture-primary text-white">
                    {categories.find(c => c.id === categoryFilter)?.name}
                    <button onClick={() => setCategoryFilter(null)} className="ml-2">
                      <X size={14} />
                    </button>
                  </span>
                )}
                {colorFilter !== null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-furniture-primary text-white">
                    {colors.find(c => c.id === colorFilter)?.name}
                    <button onClick={() => setColorFilter(null)} className="ml-2">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="font-serif text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-furniture-primary text-white rounded-md hover:bg-furniture-accent transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
