
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import PromoBanner from '../components/PromoBanner';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <PromoBanner />
    </div>
  );
};

export default Index;
