import React, { useEffect, useState } from 'react';
import { type BookingData } from '../types';

interface ConfirmationModalProps {
  bookingDetails: BookingData;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ bookingDetails, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const DetailItem: React.FC<{ label: string; value: string; }> = ({ label, value }) => (
    <div className="flex justify-between items-center border-t py-3 border-slate-200/80">
      <span className="font-medium text-slate-500 text-sm">{label}:</span>
      <span className="font-semibold text-slate-800 text-right break-all">{value}</span>
    </div>
  );

  return (
    <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
         onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={`bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
           onClick={(e) => e.stopPropagation()}>
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-5">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
          </div>
          <h2 id="modal-title" className="text-2xl font-bold text-slate-800">Termin bestätigt!</h2>
          <p className="mt-2 text-slate-600">
            Vielen Dank, <span className="font-semibold text-slate-800">{bookingDetails.fullName}</span>. Ihr Termin wurde erfolgreich gebucht.
          </p>
          
          <div className="mt-6 text-left bg-slate-50/80 rounded-lg p-4 space-y-0 border border-slate-200/80">
            <div className="flex justify-between items-center py-3">
                <span className="font-medium text-slate-500 text-sm">Name:</span> 
                <span className="font-semibold text-slate-800">{bookingDetails.fullName}</span>
            </div>
            <DetailItem label="E-Mail" value={bookingDetails.email} />
            <DetailItem label="Dienstleistung" value={bookingDetails.service} />
            <DetailItem label="Datum" value={bookingDetails.date} />
            <DetailItem label="Uhrzeit" value={bookingDetails.time} />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Eine Bestätigungs-E-Mail mit den Details wurde an Ihre Adresse gesendet.
          </p>

          <div className="mt-6">
            <button
              onClick={handleClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;