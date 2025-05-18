import React, { useState, useEffect } from 'react';
import { useLoan } from '../../context/LoanContext';
import SliderInput from '../ui/SliderInput';
import Button from '../ui/Button';
import PaymentChart from '../ui/PaymentChart';
import PaymentCalendar from '../ui/PaymentCalendar';
import { ArrowRight } from 'lucide-react';

interface LoanAmountStepProps {
  onNext: () => void;
}

const LoanAmountStep: React.FC<LoanAmountStepProps> = ({ onNext }) => {
  const { loanData, updateLoanData, formErrors, setIsLoading } = useLoan();
  
  // Local state for animation
  const [showChart, setShowChart] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Handle amount change
  const handleAmountChange = (value: number) => {
    updateLoanData({ amount: value });
  };
  
  // Handle term change
  const handleTermChange = (value: number) => {
    updateLoanData({ term: value });
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
  
  // Animate chart and calendar appearance
  useEffect(() => {
    const chartTimer = setTimeout(() => {
      setShowChart(true);
    }, 500);
    
    const calendarTimer = setTimeout(() => {
      setShowCalendar(true);
    }, 1000);
    
    return () => {
      clearTimeout(chartTimer);
      clearTimeout(calendarTimer);
    };
  }, []);
  
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">¿Cuánto necesitas?</h2>
        <p className="mt-2 text-gray-600">Selecciona el monto y plazo del préstamo que necesitas</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          {/* Amount Slider */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-700 font-medium mb-4">Monto del Préstamo</h3>
            <SliderInput
              min={10000}
              max={2500000}
              step={10000}
              value={loanData.amount}
              onChange={handleAmountChange}
              formatLabel={(value) => formatCurrency(value)}
              labelMin="$10.000"
              labelMax="$2.5M"
              color="bg-blue-600"
            />
            {formErrors.amount && (
              <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
            )}
          </div>
          
          {/* Term Slider */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-700 font-medium mb-4">Plazo en Meses</h3>
            <SliderInput
              min={1}
              max={60}
              step={1}
              value={loanData.term}
              onChange={handleTermChange}
              formatLabel={(value) => `${value}`}
              unit=" meses"
              labelMin="1 mes"
              labelMax="60 meses"
              color="bg-indigo-600"
            />
            {formErrors.term && (
              <p className="text-red-500 text-sm mt-1">{formErrors.term}</p>
            )}
          </div>
          
          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-gray-700 font-medium mb-4">Resumen de Pagos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Cuota Mensual</p>
                <p className="text-xl font-semibold text-gray-900">{formatCurrency(loanData.monthlyPayment)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Tasa de Interés</p>
                <p className="text-xl font-semibold text-gray-900">{loanData.interestRate}% anual</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total a Pagar</p>
                <p className="text-xl font-semibold text-gray-900">{formatCurrency(loanData.totalPayment)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Plazo Total</p>
                <p className="text-xl font-semibold text-gray-900">{loanData.term} meses</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Payment Chart */}
          <div 
            className={`
              bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-500
              ${showChart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h3 className="text-gray-700 font-medium mb-4">Distribución del Préstamo</h3>
            <PaymentChart 
              principal={loanData.amount}
              interest={loanData.monthlyPayment - (loanData.amount / loanData.term)}
              term={loanData.term}
            />
          </div>
          
          {/* Payment Calendar */}
          <div 
            className={`
              bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-500
              ${showCalendar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h3 className="text-gray-700 font-medium mb-4">Calendario de Pagos</h3>
            <PaymentCalendar 
              startDate={new Date()}
              loanAmount={loanData.amount}
              monthlyPayment={loanData.monthlyPayment}
              interestRate={loanData.interestRate}
              termMonths={loanData.term}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-end">
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

export default LoanAmountStep;