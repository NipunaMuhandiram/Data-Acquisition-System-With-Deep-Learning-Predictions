import React, { createContext, useState, useContext } from 'react';

// Create the context
const PortContext = createContext();

// Create a provider component
export const PortProvider = ({ children }) => {
  const [selectedPort, setSelectedPort] = useState('');

  return (
    <PortContext.Provider value={{ selectedPort, setSelectedPort }}>
      {children}
    </PortContext.Provider>
  );
};

// Custom hook to use the port context
export const usePortContext = () => {
  const context = useContext(PortContext);
  if (!context) {
    throw new Error('usePortContext must be used within a PortProvider');
  }
  return context;
};