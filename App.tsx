import React, { useState, useCallback } from 'react';
import BookingForm from './components/BookingForm';
import ConfirmationModal from './components/ConfirmationModal';
import { type BookingData } from './types';

const App: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<BookingData | null>(null);

  const handleBookingSubmit = useCallback((data: BookingData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setBookingDetails(data);
      setIsSubmitting(false);
    }, 2000);
  }, []);

  const handleCloseModal = useCallback(() => {
    setBookingDetails(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-2xl">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">Termin buchen</h1>
            <p className="mt-4 text-lg text-gray-600">Füllen Sie das Formular unten aus, um Ihren Besuch zu planen.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <BookingForm onSubmit={handleBookingSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500">
            <p>&copy; {new Date().getFullYear()} Acme Termine. Alle Rechte vorbehalten.</p>
        </footer>
      </main>

      {bookingDetails && (
        <ConfirmationModal bookingDetails={bookingDetails} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;