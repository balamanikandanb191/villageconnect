// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
