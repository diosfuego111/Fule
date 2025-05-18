import React, { useEffect } from 'react';
import Header from './layout/Header';
import StepIndicator from './ui/StepIndicator';
import { useLoan } from '../context/LoanContext';
import LoanAmountStep from './steps/LoanAmountStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import FinancialInfoStep from './steps/FinancialInfoStep';
import BankVerificationStep from './steps/BankVerificationStep';
import SummaryStep from './steps/SummaryStep';
import LoadingOverlay from './ui/LoadingOverlay';

const LoanApplication: React.FC = () => {
  const { 
    currentStep, 
    setCurrentStep, 
    isLoading, 
    loanData, 
    validateStep,
    calculatePayment 
  } = useLoan();

  // Calculate payment when amount or term changes
  useEffect(() => {
    calculatePayment();
  }, [loanData.amount, loanData.term]);

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LoanAmountStep onNext={handleNextStep} />;
      case 2:
        return <PersonalInfoStep onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3:
        return <FinancialInfoStep onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 4:
        return <BankVerificationStep onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 5:
        return <SummaryStep onPrev={handlePrevStep} />;
      default:
        return <LoanAmountStep onNext={handleNextStep} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
          <div className="p-6 sm:p-8">
            <StepIndicator currentStep={currentStep} totalSteps={5} />
            
            <div className="mt-8">
              {renderStep()}
            </div>
          </div>
        </div>
      </main>
      
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default LoanApplication;