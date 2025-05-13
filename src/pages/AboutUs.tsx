
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-furniture-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">About Elegant Living</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Crafting spaces that inspire living for over 20 years. We blend artisanal craftsmanship with modern design to create furniture that transforms houses into homes.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-medium mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Elegant Living began with a simple idea: furniture should be both beautiful and functional. Founded in 2002 by master craftsman James Miller, we started as a small workshop creating custom pieces for local clients.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, our passion for exceptional craftsmanship and sustainable materials has guided our growth. Today, we're proud to offer a diverse collection of furniture that celebrates the beauty of natural materials and the skill of experienced artisans.
              </p>
              <p className="text-gray-700">
                While we've grown substantially since our humble beginnings, our commitment to quality, sustainability, and customer satisfaction remains as strong as ever. Every piece that leaves our workshop carries with it the Elegant Living promise of excellence.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/src/assets/bed-1.jpg" 
                alt="Craftsman at work" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-5 -left-5 bg-furniture-primary text-white py-4 px-6 rounded-lg">
                <p className="font-serif text-xl">Est. 2002</p>
                <p>20+ Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-medium mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-furniture-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-furniture-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 18a2 2 0 002-2M5 18a2 2 0 01-2-2m2 0h10M7 6v4m10-4v4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-4">Exceptional Craftsmanship</h3>
              <p className="text-gray-700">
                We believe in furniture that's built to last. Every piece is crafted with attention to detail and a commitment to excellence.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-furniture-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-furniture-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2M3 16V6m0 0V4m0 2h18M3 16v2m18-12V4m0 2v10m0 2v-2" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We're committed to responsible sourcing and manufacturing. Our furniture is designed to be environmentally friendly from forest to living room.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-furniture-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-furniture-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium mb-4">Customer Satisfaction</h3>
              <p className="text-gray-700">
                Your happiness is our priority. We're dedicated to providing exceptional customer service at every step of your journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-medium mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="aspect-square bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <img 
                    src={`/src/assets/testimonial-${member <= 3 ? member : 1}.jpg`} 
                    alt={`Team member ${member}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Jane Doe</h3>
                <p className="text-gray-500">Creative Director</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-furniture-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Browse our collection of handcrafted furniture pieces and find the perfect addition to your home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-furniture-primary hover:bg-furniture-accent text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Shop Collection
            </Link>
            <Link 
              to="/contact" 
              className="bg-white border border-furniture-primary text-furniture-primary hover:bg-furniture-primary hover:text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
