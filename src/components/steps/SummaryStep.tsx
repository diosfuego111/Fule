import React, { useState } from 'react';
import { useLoan } from '../../context/LoanContext';
import Button from '../ui/Button';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface SummaryStepProps {
  onPrev: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ onPrev }) => {
  const { loanData, updateLoanData, formErrors, setIsLoading, resetForm } = useLoan();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Handle terms agreement change
  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLoanData({ termsAgreed: e.target.checked });
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsLoading(true);
    
    // Simulate API call for submission
    setTimeout(() => {
      // In a real application, this would send data to the backend
      console.log('Form submitted with data:', loanData);
      
      setIsLoading(false);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2500);
  };
  
  // Handle starting a new application
  const handleNewApplication = () => {
    resetForm();
  };
  
  // Get employment type display text
  const getEmploymentTypeText = (): string => {
    switch (loanData.employmentType) {
      case 'employed':
        return 'Empleado en relación de dependencia';
      case 'self-employed':
        return 'Trabajador autónomo / Independiente';
      case 'retired':
        return 'Jubilado / Pensionado';
      case 'unemployed':
        return 'Desempleado';
      case 'student':
        return 'Estudiante';
      default:
        return loanData.employmentType;
    }
  };
  
  // Get card type display text
  const getCardTypeText = (): string => {
    switch (loanData.cardType) {
      case 'credit':
        return 'Tarjeta de Crédito';
      case 'debit':
        return 'Tarjeta de Débito';
      case 'mercadopago':
        return 'Mercado Pago';
      case 'uala':
        return 'Ualá';
      default:
        return loanData.cardType;
    }
  };
  
  // Render success message after submission
  if (isSubmitted) {
    return (
      <div className="py-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Solicitud Enviada con Éxito!</h2>
            <p className="text-gray-600 mb-6">
              Tu solicitud de préstamo de {formatCurrency(loanData.amount)} ha sido recibida correctamente.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Número de solicitud:</span> {Math.floor(Math.random() * 9000000) + 1000000}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Fecha de solicitud:</span> {new Date().toLocaleDateString('es-AR')}
              </p>
            </div>
            
            <p className="text-gray-600 mb-8">
              Hemos enviado un email de confirmación a <span className="font-medium">{loanData.email}</span> con los detalles de tu solicitud.
              En las próximas 24-48 horas recibirás información sobre el estado de tu préstamo.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleNewApplication}
                variant="primary"
                size="lg"
              >
                Realizar Nueva Solicitud
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Resumen de Solicitud</h2>
        <p className="mt-2 text-gray-600">Revisa la información de tu solicitud de préstamo</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Detalles del Préstamo</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Monto Solicitado</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(loanData.amount)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Plazo</p>
              <p className="text-xl font-semibold text-gray-900">{loanData.term} meses</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Cuota Mensual</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(loanData.monthlyPayment)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Total a Pagar</p>
              <p className="text-xl font-semibold text-gray-900">{formatCurrency(loanData.totalPayment)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Tasa de Interés</p>
              <p className="text-xl font-semibold text-gray-900">{loanData.interestRate}% anual</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Primera Cuota</p>
              <p className="text-xl font-semibold text-gray-900">
                {new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información Personal</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Nombre Completo</p>
              <p className="text-base font-medium text-gray-900">{loanData.fullName}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">DNI</p>
              <p className="text-base font-medium text-gray-900">{loanData.dni}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Correo Electrónico</p>
              <p className="text-base font-medium text-gray-900">{loanData.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-base font-medium text-gray-900">{loanData.phone}</p>
            </div>
            
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="text-base font-medium text-gray-900">{loanData.address}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información Financiera</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Situación Laboral</p>
              <p className="text-base font-medium text-gray-900">{getEmploymentTypeText()}</p>
            </div>
            
            {loanData.employmentType === 'employed' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Empleador</p>
                  <p className="text-base font-medium text-gray-900">{loanData.employerName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Ingreso Mensual</p>
                  <p className="text-base font-medium text-gray-900">
                    {loanData.monthlyIncome ? formatCurrency(loanData.monthlyIncome) : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Años de Antigüedad</p>
                  <p className="text-base font-medium text-gray-900">{loanData.employmentYears || 'N/A'}</p>
                </div>
              </>
            )}
            
            {loanData.employmentType === 'self-employed' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Tipo de Actividad</p>
                  <p className="text-base font-medium text-gray-900">{loanData.businessType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Ingreso Mensual</p>
                  <p className="text-base font-medium text-gray-900">
                    {loanData.monthlyIncome ? formatCurrency(loanData.monthlyIncome) : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Años de Actividad</p>
                  <p className="text-base font-medium text-gray-900">{loanData.businessYears || 'N/A'}</p>
                </div>
              </>
            )}
            
            {loanData.employmentType === 'retired' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Tipo de Pensión</p>
                  <p className="text-base font-medium text-gray-900">{loanData.pensionType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Ingreso Mensual</p>
                  <p className="text-base font-medium text-gray-900">
                    {loanData.monthlyIncome ? formatCurrency(loanData.monthlyIncome) : 'N/A'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información de Tarjeta</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Tipo de Tarjeta</p>
              <p className="text-base font-medium text-gray-900">{getCardTypeText()}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Número de Tarjeta</p>
              <p className="text-base font-medium text-gray-900">
                {loanData.cardNumber.replace(/\d(?=\d{4})/g, "•")}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Nombre en la Tarjeta</p>
              <p className="text-base font-medium text-gray-900">{loanData.cardName}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Vencimiento</p>
              <p className="text-base font-medium text-gray-900">{loanData.cardExpiry}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-start">
          <AlertCircle className="flex-shrink-0 h-5 w-5 text-blue-600 mt-0.5" />
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Al enviar esta solicitud, autorizas a CreditoPro a realizar una evaluación crediticia y a contactarte para continuar con el proceso.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={loanData.termsAgreed}
                onChange={handleAgreementChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                Acepto los términos y condiciones
              </label>
              <p className="text-gray-500">
                He leído y acepto los <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a> y la <a href="#" className="text-blue-600 hover:underline">política de privacidad</a> de CreditoPro.
              </p>
            </div>
          </div>
          
          {formErrors.termsAgreed && (
            <p className="mt-2 text-sm text-red-600">{formErrors.termsAgreed}</p>
          )}
        </div>
      </div>
      
      <div className="mt-10 flex justify-between">
        <Button 
          onClick={onPrev}
          variant="outline"
          size="lg"
          icon={<ArrowLeft className="h-5 w-5" />}
          disabled={isSubmitting}
        >
          Anterior
        </Button>
        
        <Button 
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          disabled={!loanData.termsAgreed || isSubmitting}
        >
          {isSubmitting ? 'Enviando solicitud...' : 'Enviar Solicitud'}
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;