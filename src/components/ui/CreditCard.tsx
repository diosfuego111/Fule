import React, { useState } from 'react';

interface CreditCardProps {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  type: 'credit' | 'debit' | 'mercadopago' | 'uala';
  focused: 'number' | 'name' | 'expiry' | 'cvv' | null;
}

const CreditCard: React.FC<CreditCardProps> = ({
  number,
  name,
  expiry,
  cvv,
  type,
  focused
}) => {
  const [flipped, setFlipped] = useState(false);
  
  // When CVV is focused, flip the card
  React.useEffect(() => {
    if (focused === 'cvv') {
      setFlipped(true);
    } else {
      setFlipped(false);
    }
  }, [focused]);
  
  // Format card number with spaces
  const formatCardNumber = (number: string) => {
    if (!number) return '•••• •••• •••• ••••';
    const formatted = number.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    return formatted || '•••• •••• •••• ••••';
  };
  
  // Get card logo based on type
  const getCardLogo = () => {
    switch (type) {
      case 'credit':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'debit':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'mercadopago':
        return (
          <div className="text-white font-bold text-sm">
            Mercado Pago
          </div>
        );
      case 'uala':
        return (
          <div className="text-white font-bold text-sm">
            Ualá
          </div>
        );
      default:
        return null;
    }
  };
  
  // Get background gradient based on card type
  const getCardBackground = () => {
    switch (type) {
      case 'credit':
        return 'bg-gradient-to-r from-blue-800 to-indigo-900';
      case 'debit':
        return 'bg-gradient-to-r from-green-700 to-emerald-800';
      case 'mercadopago':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600';
      case 'uala':
        return 'bg-gradient-to-r from-purple-700 to-pink-600';
      default:
        return 'bg-gradient-to-r from-gray-700 to-gray-900';
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto perspective">
      <div 
        className={`
          relative w-full h-52 rounded-xl shadow-lg transition-transform duration-700 transform-style
          ${flipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* Front of card */}
        <div 
          className={`
            absolute inset-0 ${getCardBackground()} rounded-xl p-6 flex flex-col justify-between
            backface-hidden
          `}
        >
          <div className="flex justify-between">
            <div className="w-12">
              {/* Chip */}
              <div className="w-10 h-7 bg-yellow-300 bg-opacity-80 rounded-md flex items-center justify-center">
                <div className="w-8 h-4 bg-yellow-200 bg-opacity-50 rounded-sm"></div>
              </div>
            </div>
            <div className="flex items-center">
              {getCardLogo()}
            </div>
          </div>
          
          <div className={`mt-4 ${focused === 'number' ? 'text-white' : 'text-gray-300'}`}>
            <p className="font-mono text-xl tracking-wider">
              {formatCardNumber(number)}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className={`flex-1 mr-4 ${focused === 'name' ? 'text-white' : 'text-gray-300'}`}>
              <p className="text-xs uppercase tracking-wider mb-1">Card Holder</p>
              <p className="font-medium truncate">
                {name || 'Nombre Apellido'}
              </p>
            </div>
            <div className={`text-right ${focused === 'expiry' ? 'text-white' : 'text-gray-300'}`}>
              <p className="text-xs uppercase tracking-wider mb-1">Expires</p>
              <p className="font-medium">
                {expiry || 'MM/YY'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`
            absolute inset-0 ${getCardBackground()} rounded-xl p-6 flex flex-col justify-between
            rotate-y-180 backface-hidden
          `}
        >
          <div className="h-10 bg-black bg-opacity-50 -mx-6 mt-4"></div>
          
          <div className="relative">
            <div className="bg-white bg-opacity-90 h-10 rounded-sm flex items-center justify-end px-3">
              <p className={`font-mono text-gray-900 ${focused === 'cvv' ? 'font-bold' : ''}`}>
                {cvv || '•••'}
              </p>
            </div>
            <p className="absolute -bottom-6 right-0 text-xs text-gray-300">CVV</p>
          </div>
          
          <div className="flex justify-end items-center">
            {getCardLogo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;