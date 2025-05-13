import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Star, ShoppingCart, Truck, Clock, Shield, Pencil, Loader2 } from 'lucide-react';
import { Product, Color, Size } from '../types';
import { api } from '../lib/api';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const [isCustomSizeModalOpen, setIsCustomSizeModalOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [customDepth, setCustomDepth] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        if (!productId) {
          setError('Product ID is required');
          setLoading(false);
          return;
        }

        const productData = await api.getProductById(Number(productId));
        
        if (!productData) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        setProduct(productData);
        setColors(productData.colors || []);
        setSizes(productData.sizes || []);
        setReviews(productData.reviews || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);
  
  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
  };
  
  const handleSizeSelect = (sizeValue: string) => {
    setSelectedSize(sizeValue);
    if (sizeValue === 'custom') {
      setIsCustomSizeModalOpen(true);
    }
  };
  
  const handleQuantityChange = (change: number) => {
    if (!product) return;
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    const selectedColorObj = colors.find(color => color.value === selectedColor);
    const selectedSizeObj = selectedSize === 'custom' 
      ? { id: 0, name: 'Custom', dimensions: `W:${customWidth}cm x H:${customHeight}cm x D:${customDepth}cm` }
      : sizes.find(size => size.name === selectedSize);
    
    if (!selectedColorObj || !selectedSizeObj) {
      toast.error("Please select valid options");
      return;
    }
    
    addToCart(product, quantity, selectedColorObj, selectedSizeObj);
    
    toast.success("Added to cart successfully!");
  };
  
  const handleSubmitCustomSize = () => {
    if (!customWidth || !customHeight || !customDepth) {
      toast.error("Please provide all dimensions");
      return;
    }
    
    setIsCustomSizeModalOpen(false);
    toast("Custom size saved", {
      description: `W:${customWidth}cm x H:${customHeight}cm x D:${customDepth}cm`
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={24} />
            <span>Loading product details...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-serif mb-4">{error || 'Product Not Found'}</h1>
            <Button onClick={() => navigate('/products')}>Back to Products</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/products')}>
            ← Back to Products
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  className={`min-w-[80px] h-20 rounded-md overflow-hidden border-2 ${activeImageIndex === index ? 'border-furniture-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info & Options */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < product.rating ? "gold" : "none"} 
                      color={i < product.rating ? "gold" : "gray"} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
              <div className="text-2xl font-medium">${product.price.toFixed(2)}</div>
            </div>
            
            <p className="text-gray-700">{product.description}</p>
            
            <div className="space-y-4">
              {/* Color Selection */}
              <div>
                <Label className="block mb-2">Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-10 h-10 rounded-full border ${selectedColor === color.value ? 'border-black ring-2 ring-offset-2 ring-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleColorSelect(color.value)}
                      aria-label={color.name}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <div className="mt-1 text-sm text-gray-500">
                    Selected: {colors.find(c => c.value === selectedColor)?.name}
                  </div>
                )}
              </div>
              
              {/* Size Selection */}
              <div>
                <Label htmlFor="size-selection" className="block mb-2">Size</Label>
                <Select onValueChange={handleSizeSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size.id} value={size.name}>
                        {size.name} ({size.dimensions})
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Quantity Selection */}
              <div>
                <Label className="block mb-2">Quantity</Label>
                <div className="flex items-center">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                  <span className="ml-3 text-sm text-gray-500">
                    {product.stock} items available
                  </span>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button 
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="border-t pt-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Truck size={24} className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium">Free Delivery</h3>
                    <p className="text-sm text-gray-600">For orders over $500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={24} className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium">Estimated Delivery</h3>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={24} className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium">Quality Guarantee</h3>
                    <p className="text-sm text-gray-600">2-year warranty</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Pencil size={24} className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium">Customization</h3>
                    <p className="text-sm text-gray-600">Available on request</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{review.author}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < review.rating ? "gold" : "none"} 
                            color={i < review.rating ? "gold" : "gray"} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Custom Size Modal */}
      <Dialog open={isCustomSizeModalOpen} onOpenChange={setIsCustomSizeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Size Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="width">Width (cm)</Label>
                <Input
                  id="width"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="depth">Depth (cm)</Label>
                <Input
                  id="depth"
                  value={customDepth}
                  onChange={(e) => setCustomDepth(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Input
                id="notes"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Any special requirements..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomSizeModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitCustomSize}>
              Save Custom Size
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
