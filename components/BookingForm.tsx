import React, { useState } from 'react';
import { type BookingData, type FormErrors } from '../types';

interface InputFieldProps {
  id: string;
  name: keyof BookingData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, label, value, onChange, placeholder, error, type = 'text' }) => (
  <div className="grid grid-cols-1 items-start gap-y-2 sm:grid-cols-3 sm:gap-x-4 sm:items-center">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 sm:text-right">
      {label}
    </label>
    <div className="sm:col-span-2">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${
          error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500' 
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p id={`${id}-error`} className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  </div>
);


const BookingForm: React.FC<{ onSubmit: (data: BookingData) => void; isSubmitting: boolean; }> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    email: '',
    service: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vollständiger Name ist erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-Mail ist ungültig';
    }
    if (!formData.service.trim()) newErrors.service = 'Dienstleistung ist erforderlich';
    if (!formData.date.trim()) newErrors.date = 'Datum ist erforderlich';
    if (!formData.time.trim()) newErrors.time = 'Uhrzeit ist erforderlich';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <InputField
        id="fullName"
        name="fullName"
        label="Vollständiger Name"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Max Mustermann"
        error={errors.fullName}
      />
      <InputField
        id="email"
        name="email"
        label="E-Mail-Adresse"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="sie@beispiel.com"
        error={errors.email}
      />
      <InputField
        id="service"
        name="service"
        label="Dienstleistung"
        value={formData.service}
        onChange={handleChange}
        placeholder="z.B. Haarschnitt, Beratung"
        error={errors.service}
      />
      <InputField
        id="date"
        name="date"
        label="Bevorzugtes Datum"
        type="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="tt.mm.jjjj"
        error={errors.date}
      />
      <InputField
        id="time"
        name="time"
        label="Bevorzugte Uhrzeit"
        value={formData.time}
        onChange={handleChange}
        placeholder="--:--"
        error={errors.time}
      />

      <div className="pt-2 sm:grid sm:grid-cols-3 sm:gap-x-4">
        <div className="sm:col-start-2 sm:col-span-2">
          <button type="submit" disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:shadow-md">
            {isSubmitting ? 'Wird gebucht...' : 'Termin buchen'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;