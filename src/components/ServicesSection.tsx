// src/components/ServicesSection.tsx
import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { API_ENDPOINTS } from '../config/api';

// --- DATA TYPES ---
interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
}

interface RequestFormData {
  name: string;
  address: string;
  phone: string;
  problem: string;
}

// --- POP-UP MODAL COMPONENT ---
const ServiceRequestModal = ({ service, onClose }: { service: Service | null; onClose: () => void; }) => {
  if (!service) return null;

  const [formData, setFormData] = useState<RequestFormData>({ name: '', address: '', phone: '', problem: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const submissionData = {
      serviceId: service.id,
      serviceName: service.name,
      ...formData,
    };

    try {
      // Inga thaan namma unmaiyaana API-ah koopdurom!
      const response = await fetch(API_ENDPOINTS.requestService, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      const result = await response.json();
      setSubmitMessage({ type: 'success', text: `Success! Your Request ID is: ${result.requestId}` });
      
      // Success aana aprom, 3 second-la modal-ah close pannidalam
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Failed to submit request. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Request: {service.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><Icon name="X" size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label><input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" /></div>
          <div><label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label><textarea name="address" id="address" rows={2} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea></div>
          <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label><input type="tel" name="phone" id="phone" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" /></div>
          <div><label htmlFor="problem" className="block text-sm font-medium text-gray-700">Describe the Problem</label><textarea name="problem" id="problem" rows={3} required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea></div>
          
          {submitMessage && (
            <div className={`p-2 rounded text-center text-sm ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitMessage.text}
            </div>
          )}

          <div className="text-right">
            <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- MAIN SERVICES SECTION COMPONENT ---
const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.services);
        if (!response.ok) {
          throw new Error('Failed to fetch services from API');
        }
        const data = await response.json();
        setServices(data.services || []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getServiceIcon = (category: string) => {
    const iconMap: { [key: string]: { name: keyof typeof import('lucide-react').icons; color: string } } = {
      water: { name: 'Droplet', color: 'text-blue-600' },
      electricity: { name: 'Zap', color: 'text-yellow-600' },
      healthcare: { name: 'Heart', color: 'text-red-600' },
      education: { name: 'GraduationCap', color: 'text-purple-600' },
      transport: { name: 'Car', color: 'text-gray-600' },
      default: { name: 'Home', color: 'text-green-600' },
    };
    const { name, color } = iconMap[category.toLowerCase()] || iconMap.default;
    return <Icon name={name} className={`h-6 w-6 ${color}`} />;
  };

  const handleRequestClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section className="py-16 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm-px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Available Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore the range of services available to our village community</p>
          </div>
          
          {loading && <div className="text-center"><Icon name="Loader2" className="h-12 w-12 text-green-600 animate-spin mx-auto" /></div>}
          
          {error && <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">Error: {error}</div>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">{getServiceIcon(service.category)}</div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{service.status}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  </div>
                  <button onClick={() => handleRequestClick(service)} className="w-full mt-4 bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors">
                    Request Service
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ServiceRequestModal 
        service={selectedService} 
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ServicesSection;
