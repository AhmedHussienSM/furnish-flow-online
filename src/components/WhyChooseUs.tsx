
import React from 'react';
import { Truck, Award, Undo, Shield } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <Truck size={48} />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on all orders over $1000 within the continental US.',
    },
    {
      id: 2,
      icon: <Award size={48} />,
      title: 'Premium Quality',
      description: 'Each piece is crafted with attention to detail and premium materials.',
    },
    {
      id: 3,
      icon: <Undo size={48} />,
      title: '30-Day Returns',
      description: 'Not satisfied? Return within 30 days for a full refund or exchange.',
    },
    {
      id: 4,
      icon: <Shield size={48} />,
      title: '3 Year Warranty',
      description: 'Every purchase comes with our comprehensive 3-year warranty.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-3">
            Why Choose Elegance Home
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to quality, customer satisfaction, and making your home beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="text-center p-6">
              <div className="text-furniture-primary mb-4 inline-block">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
