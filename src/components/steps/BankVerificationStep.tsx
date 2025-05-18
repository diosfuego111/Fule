import React, { useState } from 'react';
import { useLoan, CardType } from '../../context/LoanContext';
import Button from '../ui/Button';
import CreditCard from '../ui/CreditCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { ArrowLeft, ArrowRight, CreditCard as CreditCardIcon } from 'lucide-react';

interface BankVerificationStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const BankVerificationStep: React.FC<BankVerificationStepProps> = ({ onNext, onPrev }) => {
  const { loanData, updateLoanData, formErrors, setIsLoading } = useLoan();
  
  // Focus state for the card
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null);
  
  // Card type options
  const cardTypeOptions = [
    { value: 'credit', label: 'Tarjeta de Crédito' },
    { value: 'debit', label: 'Tarjeta de Débito' },
    { value: 'mercadopago', label: 'Mercado Pago' },
    { value: 'uala', label: 'Ualá' },
  ];
  
  // Handle card type change
  const handleCardTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CardType;
    updateLoanData({ cardType: value });
  };
  
  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Format card number with spaces
    if (id === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      updateLoanData({ [id]: formattedValue });
    } 
    // Format expiry date (MM/YY)
    else if (id === 'cardExpiry') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .slice(0, 5);
      updateLoanData({ [id]: formattedValue });
    }
    // Format CVV (3-4 digits)
    else if (id === 'cardCvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      updateLoanData({ [id]: formattedValue });
    }
    else {
      updateLoanData({ [id]: value });
    }
  };
  
  // Handle focus and blur for card animation
  const handleFocus = (field: 'number' | 'name' | 'expiry' | 'cvv') => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  // Handle next button click
  const handleNext = () => {
    setIsLoading(true);
    
    // Simulate verification for a better user experience
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };
  
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Verificación Bancaria</h2>
        <p className="mt-2 text-gray-600">Ingresa los datos de tu tarjeta para verificar tu cuenta bancaria</p>
        <p className="text-sm text-gray-500 mt-1">No se realizará ningún cargo a tu tarjeta</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Credit Card Preview */}
        <div className="mb-8 transform transition-all duration-500 hover:scale-105">
          <CreditCard
            number={loanData.cardNumber}
            name={loanData.cardName}
            expiry={loanData.cardExpiry}
            cvv={loanData.cardCvv}
            type={loanData.cardType}
            focused={focusedField}
          />
        </div>
        
        {/* Card Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="space-y-6">
            <Select
              id="cardType"
              label="Tipo de Tarjeta"
              value={loanData.cardType}
              onChange={handleCardTypeChange}
              options={cardTypeOptions}
              error={formErrors.cardType}
              required={true}
            />
            
            <Input
              id="cardNumber"
              label="Número de Tarjeta"
              value={loanData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              error={formErrors.cardNumber}
              required={true}
              icon={<CreditCardIcon className="h-5 w-5 text-gray-400" />}
              onFocus={() => handleFocus('number')}
              onBlur={handleBlur}
            />
            
            <Input
              id="cardName"
              label="Nombre en la Tarjeta"
              value={loanData.cardName}
              onChange={handleChange}
              placeholder="NOMBRE APELLIDO"
              error={formErrors.cardName}
              required={true}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
            />
            
            <div className="grid grid-cols-2 gap-6">
              <Input
                id="cardExpiry"
                label="Fecha de Vencimiento (MM/YY)"
                value={loanData.cardExpiry}
                onChange={handleChange}
                placeholder="MM/YY"
                error={formErrors.cardExpiry}
                required={true}
                onFocus={() => handleFocus('expiry')}
                onBlur={handleBlur}
              />
              
              <Input
                id="cardCvv"
                label="Código de Seguridad (CVV)"
                value={loanData.cardCvv}
                onChange={handleChange}
                placeholder="123"
                error={formErrors.cardCvv}
                required={true}
                onFocus={() => handleFocus('cvv')}
                onBlur={handleBlur}
              />
            </div>
            
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="save-card"
                  name="save-card"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="save-card" className="font-medium text-gray-700">
                  Guardar tarjeta para futuros pagos
                </label>
                <p className="text-gray-500">
                  Esta información se guardará de forma segura
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-between">
        <Button 
          onClick={onPrev}
          variant="outline"
          size="lg"
          icon={<ArrowLeft className="h-5 w-5" />}
        >
          Anterior
        </Button>
        
        <Button 
          onClick={handleNext}
          variant="primary"
          size="lg"
          icon={<ArrowRight className="h-5 w-5" />}
        >
          Verificar y Continuar
        </Button>
      </div>
    </div>
  );
};

export default BankVerificationStep;