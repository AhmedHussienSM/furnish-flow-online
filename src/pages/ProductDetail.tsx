
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { Size, Color } from '../types';
import { ChevronRight, Star, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === parseInt(productId || '0'));
  
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    product?.availableColors[0] || null
  );
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product?.availableSizes[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [showCustomSizeModal, setShowCustomSizeModal] = useState(false);
  const [customDimensions, setCustomDimensions] = useState({
    width: '',
    height: '',
    depth: '',
    notes: '',
  });

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-serif text-2xl mb-4">Product not found</h1>
        <Link to="/products" className="text-furniture-primary hover:underline">
          Return to all products
        </Link>
      </div>
    );
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: 'Please select options',
        description: 'Please select color and size before adding to cart',
        variant: 'destructive',
      });
      return;
    }

    addToCart(product, quantity, selectedColor, selectedSize);
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  const handleCustomSizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customSize: Size = {
      id: 999,
      name: 'Custom',
      dimensions: `W: ${customDimensions.width}cm, H: ${customDimensions.height}cm, D: ${customDimensions.depth}cm`,
    };
    setSelectedSize(customSize);
    setShowCustomSizeModal(false);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-furniture-primary">Home</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-furniture-primary">Products</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link 
            to={`/category/${product.categoryId}`} 
            className="text-gray-500 hover:text-furniture-primary"
          >
            {product.categoryId === 1 ? 'Living Room' : 
             product.categoryId === 2 ? 'Bedroom' :
             product.categoryId === 3 ? 'Dining Room' :
             product.categoryId === 4 ? 'Office' : 'Outdoor'}
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`border rounded-md overflow-hidden ${mainImage === img ? 'border-furniture-primary' : 'border-gray-200'}`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill={index < Math.floor(product.rating) ? "#D4AF37" : "none"}
                    color={index < Math.floor(product.rating) ? "#D4AF37" : "#D1D5DB"}
                    className="mr-0.5"
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="text-2xl font-medium text-furniture-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>
            
            {/* SKU */}
            <p className="text-sm text-gray-500 mb-6">
              SKU: {product.sku} | Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.availableColors.map(color => (
                  <button
                    key={color.id}
                    style={{ backgroundColor: color.value }}
                    className={`w-10 h-10 rounded-full hover:scale-110 transition-transform ${
                      selectedColor?.id === color.id ? 'ring-2 ring-offset-2 ring-furniture-primary' : ''
                    }`}
                    title={color.name}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="mt-2 text-sm text-gray-600">Selected: {selectedColor.name}</p>
              )}
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.availableSizes.map(size => (
                  <button
                    key={size.id}
                    className={`border py-2 px-3 rounded-md transition-colors ${
                      selectedSize?.id === size.id 
                        ? 'border-furniture-primary bg-furniture-primary text-white' 
                        : 'border-gray-300 hover:border-furniture-accent'
                    }`}
                    onClick={() => {
                      if (size.name === 'Custom') {
                        setShowCustomSizeModal(true);
                      } else {
                        setSelectedSize(size);
                      }
                    }}
                  >
                    <span className="block">{size.name}</span>
                    <span className="block text-xs mt-1">
                      {size.name === 'Custom' ? 'Made to order' : size.dimensions}
                    </span>
                  </button>
                ))}
              </div>
              {selectedSize && selectedSize.name !== 'Custom' && (
                <p className="mt-2 text-sm text-gray-600">Dimensions: {selectedSize.dimensions}</p>
              )}
              {selectedSize && selectedSize.name === 'Custom' && (
                <p className="mt-2 text-sm text-gray-600">{selectedSize.dimensions}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className={`w-10 h-10 flex items-center justify-center border rounded-l-md ${
                    quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= product.stock) {
                      setQuantity(val);
                    }
                  }}
                  className="w-16 h-10 text-center border-y"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className={`w-10 h-10 flex items-center justify-center border rounded-r-md ${
                    quantity >= product.stock ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 px-6 rounded-md font-medium ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-furniture-primary hover:bg-furniture-accent text-white'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t border-b py-4 space-y-3">
              <div className="flex items-center">
                <Truck size={20} className="text-furniture-primary mr-2" />
                <span>Free shipping on orders over $1000</span>
              </div>
              <div className="flex items-center">
                <Shield size={20} className="text-furniture-primary mr-2" />
                <span>3-year warranty for all furniture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to products */}
        <div className="mt-12">
          <Link to="/products" className="inline-flex items-center text-furniture-primary hover:text-furniture-accent">
            <ArrowLeft size={18} className="mr-2" />
            Back to all products
          </Link>
        </div>
      </div>

      {/* Custom Size Modal */}
      {showCustomSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="font-serif text-2xl font-medium mb-4">Custom Dimensions</h3>
            <form onSubmit={handleCustomSizeSubmit}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">Width (cm)</label>
                  <input
                    type="number"
                    required
                    placeholder="Width"
                    value={customDimensions.width}
                    onChange={(e) => setCustomDimensions({...customDimensions, width: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Height (cm)</label>
                  <input
                    type="number"
                    required
                    placeholder="Height"
                    value={customDimensions.height}
                    onChange={(e) => setCustomDimensions({...customDimensions, height: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Depth (cm)</label>
                  <input
                    type="number"
                    required
                    placeholder="Depth"
                    value={customDimensions.depth}
                    onChange={(e) => setCustomDimensions({...customDimensions, depth: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Special Instructions (optional)</label>
                <textarea
                  placeholder="Any specific requirements for your custom size"
                  value={customDimensions.notes}
                  onChange={(e) => setCustomDimensions({...customDimensions, notes: e.target.value})}
                  className="w-full border rounded-md px-3 py-2 resize-none h-24"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomSizeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-furniture-primary hover:bg-furniture-accent text-white rounded-md"
                >
                  Apply Custom Size
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
