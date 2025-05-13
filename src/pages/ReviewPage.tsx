
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '../data/mockData';
import { Product } from '../types';

const ReviewPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Find the product
  const product = products.find(p => p.id === Number(productId)) as Product;

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (reviewText.trim().length === 0) {
      toast.error("Please enter your review");
      return;
    }
    
    if (name.trim().length === 0 || email.trim().length === 0) {
      toast.error("Please enter your name and email");
      return;
    }
    
    // Submit review
    toast.success("Your review has been submitted successfully!");
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(`/product/${productId}`)}>
              ← Back to Product
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-serif mb-2">Write a Review</h1>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h2 className="font-medium">{product.name}</h2>
                <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <Label htmlFor="rating" className="block mb-2">Your Rating</Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star 
                        fill={(hoverRating || rating) >= star ? "gold" : "none"} 
                        color={(hoverRating || rating) >= star ? "gold" : "gray"}
                        size={28}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="review" className="block mb-2">Your Review</Label>
                <Textarea 
                  id="review" 
                  placeholder="Share your experience with this product..." 
                  rows={5}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="name" className="block mb-2">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block mb-2">Your Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-furniture-primary hover:bg-furniture-primary/90">
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPage;
