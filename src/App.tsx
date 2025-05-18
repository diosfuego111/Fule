import React from 'react';
import LoanApplication from './components/LoanApplication';
import { LoanProvider } from './context/LoanContext';

function App() {
  return (
    <LoanProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
        <LoanApplication />
      </div>
    </LoanProvider>
  );
}

export default App;