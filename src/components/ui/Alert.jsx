import React, { useEffect, useState } from 'react';

const Alert = ({ message, type = 'info', onClose, duration = 3000, position = 'top-right' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!isVisible) return null;

  const typeColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  return (
    <div
      className={`fixed ${positionStyles[position]} px-4 py-2 rounded-md text-white shadow-lg transition-opacity duration-300 ease-in-out 
        ${typeColors[type]}
      `}
    >
      {message}
    </div>
  );
};

export default Alert;
