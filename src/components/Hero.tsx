// src/components/Hero.tsx
import React from 'react';
import Icon from './Icon'; // Dynamic Icon component-ah import panrom

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our
            <span className="text-green-600"> Village Portal</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Access government services, connect with community resources, and stay informed about village developments - all in one place.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
              <Icon name="Users" className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600 text-sm">Serving our village community with dedicated support</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
              <Icon name="Zap" className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Access</h3>
              <p className="text-gray-600 text-sm">Fast and efficient service delivery for all residents</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
              <Icon name="Shield" className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security</p>
            </div>
          </div>

          <button
            onClick={scrollToServices}
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Explore Services</span>
            <Icon name="ArrowDown" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
