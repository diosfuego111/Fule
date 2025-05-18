import React, { createContext, useContext, useState, ReactNode } from 'react';

// Employment types
export type EmploymentType = 'employed' | 'self-employed' | 'retired' | 'unemployed' | 'student';

// Card types
export type CardType = 'credit' | 'debit' | 'mercadopago' | 'uala';

// Loan application data model
export interface LoanData {
  // Step 1: Loan details
  amount: number;
  term: number;
  monthlyPayment: number;
  totalPayment: number;
  interestRate: number;
  
  // Step 2: Personal information
  fullName: string;
  email: string;
  dni: string;
  phone: string;
  address: string;
  
  // Step 3: Financial information
  employmentType: EmploymentType;
  employerName?: string;
  monthlyIncome?: number;
  employmentYears?: number;
  businessType?: string;
  businessYears?: number;
  pensionType?: string;
  
  // Step 4: Bank verification
  cardType: CardType;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  
  // Step 5: Agreement
  termsAgreed: boolean;
}

interface LoanContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  loanData: LoanData;
  updateLoanData: (data: Partial<LoanData>) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  calculatePayment: () => void;
  formErrors: Record<string, string>;
  validateStep: (step: number) => boolean;
  resetForm: () => void;
}

const defaultLoanData: LoanData = {
  amount: 150000,
  term: 12,
  monthlyPayment: 0,
  totalPayment: 0,
  interestRate: 75, // Annual interest rate for Argentina (example)
  
  fullName: '',
  email: '',
  dni: '',
  phone: '',
  address: '',
  
  employmentType: 'employed',
  employerName: '',
  monthlyIncome: 0,
  employmentYears: 0,
  businessType: '',
  businessYears: 0,
  pensionType: '',
  
  cardType: 'credit',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
  
  termsAgreed: false
};

const LoanContext = createContext<LoanContextProps | undefined>(undefined);

export const LoanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loanData, setLoanData] = useState<LoanData>(defaultLoanData);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Update loan data
  const updateLoanData = (data: Partial<LoanData>) => {
    setLoanData(prev => ({ ...prev, ...data }));
  };

  // Calculate monthly payment
  const calculatePayment = () => {
    const monthlyRate = loanData.interestRate / 12 / 100;
    const totalMonths = loanData.term;
    const principal = loanData.amount;
    
    const x = Math.pow(1 + monthlyRate, totalMonths);
    const monthlyPayment = principal * (monthlyRate * x) / (x - 1);
    
    updateLoanData({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(monthlyPayment * totalMonths)
    });
  };

  // Validate form fields for each step
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    switch (step) {
      case 1:
        // Loan amount and term validation
        if (loanData.amount < 10000 || loanData.amount > 2500000) {
          errors.amount = 'El monto debe estar entre $10.000 y $2.500.000';
          isValid = false;
        }
        if (loanData.term < 1 || loanData.term > 60) {
          errors.term = 'El plazo debe estar entre 1 y 60 meses';
          isValid = false;
        }
        break;
        
      case 2:
        // Personal information validation
        if (!loanData.fullName) {
          errors.fullName = 'Por favor ingrese su nombre completo';
          isValid = false;
        }
        if (!loanData.email || !/^\S+@\S+\.\S+$/.test(loanData.email)) {
          errors.email = 'Por favor ingrese un correo electrónico válido';
          isValid = false;
        }
        if (!loanData.dni || !/^\d{7,8}$/.test(loanData.dni)) {
          errors.dni = 'Por favor ingrese un DNI válido (7-8 dígitos)';
          isValid = false;
        }
        if (!loanData.phone || !/^\d{10}$/.test(loanData.phone)) {
          errors.phone = 'Por favor ingrese un número de teléfono válido (10 dígitos)';
          isValid = false;
        }
        if (!loanData.address) {
          errors.address = 'Por favor ingrese su dirección';
          isValid = false;
        }
        break;
        
      case 3:
        // Financial information validation based on employment type
        if (loanData.employmentType === 'employed') {
          if (!loanData.employerName) {
            errors.employerName = 'Por favor ingrese el nombre de su empleador';
            isValid = false;
          }
          if (!loanData.monthlyIncome || loanData.monthlyIncome <= 0) {
            errors.monthlyIncome = 'Por favor ingrese un ingreso mensual válido';
            isValid = false;
          }
        } else if (loanData.employmentType === 'self-employed') {
          if (!loanData.businessType) {
            errors.businessType = 'Por favor ingrese el tipo de negocio';
            isValid = false;
          }
          if (!loanData.monthlyIncome || loanData.monthlyIncome <= 0) {
            errors.monthlyIncome = 'Por favor ingrese un ingreso mensual válido';
            isValid = false;
          }
        } else if (loanData.employmentType === 'retired') {
          if (!loanData.pensionType) {
            errors.pensionType = 'Por favor ingrese el tipo de pensión';
            isValid = false;
          }
          if (!loanData.monthlyIncome || loanData.monthlyIncome <= 0) {
            errors.monthlyIncome = 'Por favor ingrese un ingreso mensual válido';
            isValid = false;
          }
        }
        break;
        
      case 4:
        // Bank verification validation
        if (!loanData.cardNumber || !/^\d{16}$/.test(loanData.cardNumber.replace(/\s/g, ''))) {
          errors.cardNumber = 'Por favor ingrese un número de tarjeta válido (16 dígitos)';
          isValid = false;
        }
        if (!loanData.cardName) {
          errors.cardName = 'Por favor ingrese el nombre en la tarjeta';
          isValid = false;
        }
        if (!loanData.cardExpiry || !/^\d{2}\/\d{2}$/.test(loanData.cardExpiry)) {
          errors.cardExpiry = 'Por favor ingrese una fecha de vencimiento válida (MM/YY)';
          isValid = false;
        }
        if (!loanData.cardCvv || !/^\d{3,4}$/.test(loanData.cardCvv)) {
          errors.cardCvv = 'Por favor ingrese un código de seguridad válido';
          isValid = false;
        }
        break;
        
      case 5:
        // Agreement validation
        if (!loanData.termsAgreed) {
          errors.termsAgreed = 'Debe aceptar los términos y condiciones para continuar';
          isValid = false;
        }
        break;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Reset form
  const resetForm = () => {
    setLoanData(defaultLoanData);
    setCurrentStep(1);
    setFormErrors({});
  };

  return (
    <LoanContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        loanData,
        updateLoanData,
        isLoading,
        setIsLoading,
        calculatePayment,
        formErrors,
        validateStep,
        resetForm
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = (): LoanContextProps => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};