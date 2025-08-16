// src/components/ContactForm.tsx
import React, { useState } from 'react';
import Icon from './Icon'; // Dynamic Icon component-ah import panrom
import { API_ENDPOINTS } from '../config/api'; // API config file-ah import panrom

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.contact, { // Centralized URL use panrom
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have a question or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-green-600 p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-lg"><Icon name="Phone" className="h-6 w-6" /></div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-green-100">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-lg"><Icon name="Mail" className="h-6 w-6" /></div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-green-100">help@villageconnect.gov.in</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 p-3 rounded-lg"><Icon name="MessageSquare" className="h-6 w-6" /></div>
                  <div>
                    <p className="font-semibold">Office Hours</p>
                    <p className="text-green-100">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-green-100">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 lg:p-12">
              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <Icon name="AlertCircle" className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-800 font-medium">Failed to send message. Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2"><Icon name="User" className="h-4 w-4 inline mr-1" /> Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter your full name" />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2"><Icon name="Phone" className="h-4 w-4 inline mr-1" /> Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="+91 98765 43210" />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2"><Icon name="Mail" className="h-4 w-4 inline mr-1" /> Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="your@email.com" />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2"><Icon name="MessageSquare" className="h-4 w-4 inline mr-1" /> Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`} placeholder="Tell us how we can help you..." />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                  {isSubmitting ? (<><Icon name="Loader2" className="h-5 w-5 animate-spin" /><span>Sending...</span></>) : (<><Icon name="Send" className="h-5 w-5" /><span>Send Message</span></>)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
