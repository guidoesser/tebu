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
    }, 1500);
  }, []);

  const handleCloseModal = useCallback(() => {
    setBookingDetails(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-3xl">
        <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Termin buchen
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
              Füllen Sie das Formular unten aus, um Ihren Besuch zu planen.
            </p>
        </header>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200/60">
          <div className="p-8 sm:p-12">
            <BookingForm onSubmit={handleBookingSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>

        <footer className="text-center mt-10 text-slate-500 text-sm">
            <p>&copy; 2025 Acme Termine. Alle Rechte vorbehalten.</p>
        </footer>
      </main>

      {bookingDetails && (
        <ConfirmationModal bookingDetails={bookingDetails} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;