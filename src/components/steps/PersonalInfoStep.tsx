import React from 'react';
import { useLoan } from '../../context/LoanContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, Fingerprint } from 'lucide-react';

interface PersonalInfoStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ onNext, onPrev }) => {
  const { loanData, updateLoanData, formErrors, setIsLoading } = useLoan();
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateLoanData({ [id]: value });
  };
  
  // Handle next button click
  const handleNext = () => {
    setIsLoading(true);
    
    // Simulate loading for a better user experience
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1000);
  };
  
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Información Personal</h2>
        <p className="mt-2 text-gray-600">Necesitamos algunos datos para personalizar tu préstamo</p>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <Input
              id="fullName"
              label="Nombre Completo"
              value={loanData.fullName}
              onChange={handleChange}
              placeholder="Ingrese su nombre completo"
              error={formErrors.fullName}
              required={true}
              icon={<User className="h-5 w-5 text-gray-400" />}
            />
            
            {/* DNI */}
            <Input
              id="dni"
              label="DNI"
              value={loanData.dni}
              onChange={handleChange}
              placeholder="Ejemplo: 12345678"
              error={formErrors.dni}
              required={true}
              icon={<Fingerprint className="h-5 w-5 text-gray-400" />}
            />
          </div>
          
          {/* Email */}
          <Input
            id="email"
            label="Correo Electrónico"
            type="email"
            value={loanData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            error={formErrors.email}
            required={true}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
          />
          
          {/* Phone */}
          <Input
            id="phone"
            label="Número de Teléfono"
            type="tel"
            value={loanData.phone}
            onChange={handleChange}
            placeholder="Ejemplo: 1122334455"
            error={formErrors.phone}
            required={true}
            icon={<Phone className="h-5 w-5 text-gray-400" />}
          />
          
          {/* Address */}
          <Input
            id="address"
            label="Dirección"
            value={loanData.address}
            onChange={handleChange}
            placeholder="Calle, número, ciudad, código postal"
            error={formErrors.address}
            required={true}
            icon={<MapPin className="h-5 w-5 text-gray-400" />}
          />
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
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;