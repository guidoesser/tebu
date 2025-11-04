import React, { useState } from 'react';
import { type BookingData, type FormErrors } from '../types';
import { SERVICES } from '../constants';

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
  isSubmitting: boolean;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    serviceId: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name ist erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-Mail ist ungültig';
    }
    if (!formData.serviceId) newErrors.serviceId = 'Bitte wählen Sie eine Dienstleistung aus';
    if (!formData.date) {
        newErrors.date = 'Datum ist erforderlich';
    } else if (new Date(formData.date) < new Date(new Date().toDateString())) {
        newErrors.date = 'Datum darf nicht in der Vergangenheit liegen';
    }
    if (!formData.time) newErrors.time = 'Uhrzeit ist erforderlich';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Vollständiger Name</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon />
             </div>
             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Max Mustermann" required />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail-Adresse</label>
           <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon />
             </div>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                 className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                 placeholder="sie@beispiel.com" required />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">Dienstleistung</label>
        <select id="serviceId" name="serviceId" value={formData.serviceId} onChange={handleChange}
            className={`w-full py-2 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white ${errors.serviceId ? 'border-red-500' : 'border-gray-300'}`}>
          <option value="" disabled>Wählen Sie eine Dienstleistung</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.id}>{service.name} ({service.duration} Min.)</option>
          ))}
        </select>
        {errors.serviceId && <p className="mt-1 text-xs text-red-600">{errors.serviceId}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Bevorzugtes Datum</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon />
             </div>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                 className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                 required />
           </div>
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Bevorzugte Uhrzeit</label>
           <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ClockIcon />
             </div>
            <input type="time" id="time" name="time" value={formData.time} onChange={handleChange}
                 className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                 required />
          </div>
          {errors.time && <p className="mt-1 text-xs text-red-600">{errors.time}</p>}
        </div>
      </div>

      <div>
        <button type="submit" disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-150 ease-in-out">
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Wird gesendet...</span>
            </div>
          ) : (
            'Termin buchen'
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;