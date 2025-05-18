import React, { useState, useEffect } from 'react';

// Array of different loading messages
const loadingMessages = [
  "Procesando su solicitud...",
  "Verificando información...",
  "Calculando opciones de préstamo...",
  "Analizando su perfil crediticio...",
  "Preparando su oferta personalizada...",
  "Consultando bases de datos financieras...",
  "Aplicando políticas de riesgo...",
  "Revisando historial crediticio...",
  "Validando información personal...",
  "Optimizando su experiencia...",
  "Generando documentación..."
];

const LoadingOverlay: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);
  const [progress, setProgress] = useState(0);
  
  // Randomly change the loading message
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setMessage(loadingMessages[randomIndex]);
    }, 2000);
    
    // Cleanup
    return () => clearInterval(messageInterval);
  }, []);
  
  // Simulate progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const increment = Math.random() * 15;
        const newProgress = Math.min(prevProgress + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
        }
        
        return newProgress;
      });
    }, 500);
    
    // Cleanup
    return () => clearInterval(progressInterval);
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center text-center">
          {/* Animated logo */}
          <div className="mb-6 relative">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-50 animate-ping"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <p className="text-gray-700 font-medium mb-4 h-6">{message}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Dots loading animation */}
          <div className="flex space-x-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;