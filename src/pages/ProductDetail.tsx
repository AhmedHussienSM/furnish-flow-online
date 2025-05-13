import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/mockData';
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
import { Star, ShoppingCart, Truck, Clock, Shield, Pencil } from 'lucide-react';
import { Product } from '../types';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const [isCustomSizeModalOpen, setIsCustomSizeModalOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [customDepth, setCustomDepth] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  
  // Find the product
  const product = products.find(p => p.id === Number(productId));
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/products')}>Back to Products</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
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
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    const selectedColorObj = product.availableColors.find(color => color.value === selectedColor);
    const selectedSizeObj = selectedSize === 'custom' 
      ? { id: 0, name: 'Custom', dimensions: `W:${customWidth}cm x H:${customHeight}cm x D:${customDepth}cm` }
      : product.availableSizes.find(size => size.name === selectedSize);
    
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
  
  // Mock reviews
  const reviews = [
    { id: 1, author: "Jane Smith", rating: 5, date: "April 15, 2025", comment: "Absolutely love this piece! The quality exceeded my expectations and it fits perfectly in my living room." },
    { id: 2, author: "Michael Brown", rating: 4, date: "March 22, 2025", comment: "Great furniture, sturdy construction. Took away one star because the delivery was delayed by 2 days." },
    { id: 3, author: "Sara Wilson", rating: 5, date: "February 8, 2025", comment: "Perfect size and color. Assembly was straightforward and the final result looks amazing in our home." }
  ];

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
                  {product.availableColors.map((color) => (
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
                    Selected: {product.availableColors.find(c => c.value === selectedColor)?.name}
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
                    {product.availableSizes.map((size) => (
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
                className="w-full bg-furniture-primary hover:bg-furniture-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              {/* Product Info Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                  <Truck className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium text-sm">Free Delivery</h3>
                    <p className="text-xs text-gray-500">For orders above $500</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                  <Clock className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium text-sm">Estimated Delivery</h3>
                    <p className="text-xs text-gray-500">3-5 business days</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                  <Shield className="text-furniture-primary" />
                  <div>
                    <h3 className="font-medium text-sm">2-Year Warranty</h3>
                    <p className="text-xs text-gray-500">On all furniture items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif">Customer Reviews</h2>
            <Button onClick={() => navigate(`/review/${productId}`)} className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
          </div>
          
          {/* Review Cards */}
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{review.author}</h3>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? "gold" : "none"} 
                      color={i < review.rating ? "gold" : "gray"} 
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Custom Size Modal */}
        <Dialog open={isCustomSizeModalOpen} onOpenChange={setIsCustomSizeModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Custom Size</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input 
                    id="width" 
                    value={customWidth} 
                    onChange={(e) => setCustomWidth(e.target.value)} 
                    type="number" 
                    min="1"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    value={customHeight} 
                    onChange={(e) => setCustomHeight(e.target.value)} 
                    type="number" 
                    min="1"
                  />
                </div>
                <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <textarea
                  id="notes"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Any special requirements or details..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomSizeModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitCustomSize}>Save Custom Size</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
