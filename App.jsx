import React, { useState } from 'react';
import './App.css';

// Importing all pieces from the pages folder
import Header from './pages/Header';
import Toast from './pages/Toast';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import GuestFlow from './pages/GuestFlow';

const INITIAL_ROOMS = [
  { number: '101', type: 'Standard', floor: 1, price: 2500, status: 'Available' },
  { number: '102', type: 'Standard', floor: 1, price: 2500, status: 'Occupied' },
  { number: '103', type: 'Deluxe', floor: 1, price: 4500, status: 'Available' },
  { number: '201', type: 'Standard', floor: 2, price: 2500, status: 'Available' },
  { number: '202', type: 'Deluxe', floor: 2, price: 4500, status: 'Available' },
  { number: '203', type: 'Suite', floor: 2, price: 8500, status: 'Available' }
];

export default function App() {
  const [view, setView] = useState('guest');
  const [step, setStep] = useState(1); 
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [history, setHistory] = useState([]); 
  const [notification, setNotification] = useState(''); 

  const [guest, setGuest] = useState({
    name: '', email: '', nights: 1, roomType: 'Standard', idFile: null, idNumber: '',
    roomNumber: '', spaCharges: 0, diningCharges: 0, isKeyActive: false, checkoutComplete: false
  });

  const triggerSystemUpdate = (alertMessage, logAction) => {
    setNotification(alertMessage);
    setHistory(prev => [{ time: new Date().toLocaleTimeString(), action: logAction }, ...prev]);
    setTimeout(() => setNotification(''), 4000);
  };

  const resetAllPortalState = () => {
    setGuest({ 
      name: '', email: '', nights: 1, roomType: 'Standard', idFile: null, 
      idNumber: '', roomNumber: '', spaCharges: 0, diningCharges: 0, 
      isKeyActive: false, checkoutComplete: false 
    });
    setStep(1);
    setView('guest');
    triggerSystemUpdate("Portal reset. Ready for next guest.", "Reset State");
  };

  return (
    <div className="app-container">
      <Header view={view} setView={setView} />
      <Toast message={notification} />

      {view === 'profile' && <Profile guest={guest} />}
      {view === 'admin' && <Admin rooms={rooms} history={history} />}
      
      {view === 'guest' && (
        <GuestFlow 
          step={step} setStep={setStep}
          guest={guest} setGuest={setGuest}
          rooms={rooms} setRooms={setRooms}
          triggerSystemUpdate={triggerSystemUpdate}
          resetAllPortalState={resetAllPortalState}
        />
      )}
    </div>
  );
}