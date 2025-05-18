import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Monto y Plazo' },
    { number: 2, title: 'Datos Personales' },
    { number: 3, title: 'Situación Laboral' },
    { number: 4, title: 'Verificación Bancaria' },
    { number: 5, title: 'Confirmación' },
  ];

  return (
    <div className="w-full">
      <div className="hidden sm:flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div 
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full 
                  ${currentStep === step.number 
                    ? 'bg-blue-600 text-white' 
                    : currentStep > step.number 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }
                  transition-all duration-500 ease-in-out
                `}
              >
                {currentStep > step.number ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              <div className="text-xs mt-2 text-center font-medium text-gray-600">{step.title}</div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div 
                className={`
                  flex-1 h-1 mx-2
                  ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'}
                  transition-all duration-500 ease-in-out
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile step indicator */}
      <div className="sm:hidden">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-gray-500">
            Paso {currentStep} de {totalSteps}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-gray-900">
            {steps[currentStep - 1].title}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`
                w-2 h-2 rounded-full
                ${currentStep === step.number 
                  ? 'bg-blue-600' 
                  : currentStep > step.number 
                    ? 'bg-green-500' 
                    : 'bg-gray-200'
                }
                transition-all duration-500 ease-in-out
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;