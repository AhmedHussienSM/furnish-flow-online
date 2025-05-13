
import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="py-16 bg-furniture-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Get 15% Off Your First Purchase
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Sign up for our newsletter and receive a special discount on your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-md focus:outline-none text-gray-800 min-w-[250px]"
            />
            <button 
              className="bg-furniture-accent hover:bg-furniture-accent/80 text-white px-8 py-3 rounded-md transition-colors font-medium"
            >
              Subscribe Now
            </button>
          </div>
          <p className="mt-4 text-sm opacity-80">
            By subscribing, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link> and consent to receive updates from Elegance Home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
