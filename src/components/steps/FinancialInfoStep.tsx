import React from 'react';
import { useLoan, EmploymentType } from '../../context/LoanContext';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { ArrowLeft, ArrowRight, Briefcase, Building, Calculator, Clock, Landmark } from 'lucide-react';

interface FinancialInfoStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({ onNext, onPrev }) => {
  const { loanData, updateLoanData, formErrors, setIsLoading } = useLoan();
  
  // Employment type options
  const employmentOptions = [
    { value: 'employed', label: 'Empleado en relación de dependencia' },
    { value: 'self-employed', label: 'Trabajador autónomo / Independiente' },
    { value: 'retired', label: 'Jubilado / Pensionado' },
    { value: 'unemployed', label: 'Desempleado' },
    { value: 'student', label: 'Estudiante' },
  ];
  
  // Handle employment type change
  const handleEmploymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as EmploymentType;
    updateLoanData({ employmentType: value });
  };
  
  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    // Handle numeric inputs
    if (id === 'monthlyIncome' || id === 'employmentYears' || id === 'businessYears') {
      updateLoanData({ [id]: parseFloat(value) || 0 });
    } else {
      updateLoanData({ [id]: value });
    }
  };
  
  // Render form fields based on employment type
  const renderEmploymentFields = () => {
    switch (loanData.employmentType) {
      case 'employed':
        return (
          <>
            <Input
              id="employerName"
              label="Nombre de la Empresa"
              value={loanData.employerName || ''}
              onChange={handleChange}
              placeholder="Ingrese el nombre de su empleador"
              error={formErrors.employerName}
              required={true}
              icon={<Building className="h-5 w-5 text-gray-400" />}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="monthlyIncome"
                label="Ingreso Mensual (ARS)"
                type="number"
                value={loanData.monthlyIncome?.toString() || ''}
                onChange={handleChange}
                placeholder="Ejemplo: 150000"
                error={formErrors.monthlyIncome}
                required={true}
                icon={<Calculator className="h-5 w-5 text-gray-400" />}
              />
              
              <Input
                id="employmentYears"
                label="Años de Antigüedad"
                type="number"
                value={loanData.employmentYears?.toString() || ''}
                onChange={handleChange}
                placeholder="Ejemplo: 3"
                error={formErrors.employmentYears}
                required={true}
                icon={<Clock className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </>
        );
        
      case 'self-employed':
        return (
          <>
            <Input
              id="businessType"
              label="Tipo de Actividad/Negocio"
              value={loanData.businessType || ''}
              onChange={handleChange}
              placeholder="Ejemplo: Comercio, Profesional, etc."
              error={formErrors.businessType}
              required={true}
              icon={<Briefcase className="h-5 w-5 text-gray-400" />}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="monthlyIncome"
                label="Ingreso Mensual (ARS)"
                type="number"
                value={loanData.monthlyIncome?.toString() || ''}
                onChange={handleChange}
                placeholder="Ejemplo: 150000"
                error={formErrors.monthlyIncome}
                required={true}
                icon={<Calculator className="h-5 w-5 text-gray-400" />}
              />
              
              <Input
                id="businessYears"
                label="Años de Actividad"
                type="number"
                value={loanData.businessYears?.toString() || ''}
                onChange={handleChange}
                placeholder="Ejemplo: 3"
                error={formErrors.businessYears}
                required={true}
                icon={<Clock className="h-5 w-5 text-gray-400" />}
              />
            </div>
          </>
        );
        
      case 'retired':
        return (
          <>
            <Input
              id="pensionType"
              label="Tipo de Jubilación/Pensión"
              value={loanData.pensionType || ''}
              onChange={handleChange}
              placeholder="Ejemplo: Jubilación ordinaria, pensión, etc."
              error={formErrors.pensionType}
              required={true}
              icon={<Landmark className="h-5 w-5 text-gray-400" />}
            />
            
            <Input
              id="monthlyIncome"
              label="Ingreso Mensual (ARS)"
              type="number"
              value={loanData.monthlyIncome?.toString() || ''}
              onChange={handleChange}
              placeholder="Ejemplo: 100000"
              error={formErrors.monthlyIncome}
              required={true}
              icon={<Calculator className="h-5 w-5 text-gray-400" />}
            />
          </>
        );
        
      case 'unemployed':
      case 'student':
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <p className="text-yellow-700">
              Para continuar con la solicitud, necesitamos verificar una fuente de ingresos. Por favor, seleccione otra opción si dispone de algún tipo de ingreso regular.
            </p>
          </div>
        );
        
      default:
        return null;
    }
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
  
  // Check if continue is disabled
  const isContinueDisabled = loanData.employmentType === 'unemployed' || loanData.employmentType === 'student';
  
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Situación Laboral</h2>
        <p className="mt-2 text-gray-600">Cuéntanos sobre tu situación laboral y fuentes de ingreso</p>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="space-y-6">
          {/* Employment Type */}
          <Select
            id="employmentType"
            label="Situación Laboral"
            value={loanData.employmentType}
            onChange={handleEmploymentChange}
            options={employmentOptions}
            error={formErrors.employmentType}
            required={true}
          />
          
          {/* Dynamic fields based on employment type */}
          {renderEmploymentFields()}
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
          disabled={isContinueDisabled}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default FinancialInfoStep;