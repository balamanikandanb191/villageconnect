// src/components/Header.tsx
import React from 'react';
import Icon from './Icon'; // Dynamic Icon component-ah import panrom

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Icon name="TreePine" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Village Connect</h1>
              <p className="text-sm text-gray-600">Digital Service Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="Phone" className="h-4 w-4" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="Mail" className="h-4 w-4" />
              <span className="text-sm">help@villageconnect.gov.in</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
