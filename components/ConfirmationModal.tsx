import React from 'react';
import { type BookingData } from '../types';
import { SERVICES } from '../constants';

interface ConfirmationModalProps {
  bookingDetails: BookingData;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ bookingDetails, onClose }) => {
  const service = SERVICES.find(s => s.id === bookingDetails.serviceId);
  const formattedDate = new Date(bookingDetails.date).toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(`1970-01-01T${bookingDetails.time}`).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
         onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto transform transition-all duration-300 scale-95 hover:scale-100"
           onClick={(e) => e.stopPropagation()}>
        <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-5">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
          <h2 className="text-2xl font-bold text-gray-800">Termin bestätigt!</h2>
          <p className="mt-2 text-gray-600">
            Vielen Dank, <span className="font-semibold">{bookingDetails.name}</span>. Ihr Termin wurde erfolgreich gebucht.
          </p>
          
          <div className="mt-6 text-left bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
            <p className="flex justify-between">
                <span className="font-medium text-gray-500">Dienstleistung:</span> 
                <span className="font-semibold text-gray-800">{service?.name || 'N/A'}</span>
            </p>
            <p className="flex justify-between">
                <span className="font-medium text-gray-500">Datum:</span> 
                <span className="font-semibold text-gray-800">{formattedDate}</span>
            </p>
            <p className="flex justify-between">
                <span className="font-medium text-gray-500">Uhrzeit:</span> 
                <span className="font-semibold text-gray-800">{formattedTime} Uhr</span>
            </p>
             <p className="flex justify-between border-t pt-3 mt-3 border-gray-200">
                <span className="font-medium text-gray-500">E-Mail:</span> 
                <span className="font-semibold text-gray-800 break-all">{bookingDetails.email}</span>
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Eine Bestätigungs-E-Mail mit den Details wurde an Ihre Adresse gesendet.
          </p>

          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm transition-transform duration-150 transform hover:scale-105"
            >
              Weiteren Termin buchen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;