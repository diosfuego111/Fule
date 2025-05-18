import React from 'react';

interface Payment {
  date: Date;
  amount: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface PaymentCalendarProps {
  startDate: Date;
  loanAmount: number;
  monthlyPayment: number;
  interestRate: number;
  termMonths: number;
}

const PaymentCalendar: React.FC<PaymentCalendarProps> = ({
  startDate,
  loanAmount,
  monthlyPayment,
  interestRate,
  termMonths
}) => {
  // Function to calculate payment schedule
  const calculatePaymentSchedule = (): Payment[] => {
    const payments: Payment[] = [];
    
    let remainingBalance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    let currentDate = new Date(startDate);
    
    for (let i = 0; i < termMonths; i++) {
      const interest = remainingBalance * monthlyRate;
      const principal = monthlyPayment - interest;
      remainingBalance -= principal;
      
      // If it's the last payment, adjust for any rounding issues
      if (i === termMonths - 1) {
        remainingBalance = 0;
      }
      
      const paymentDate = new Date(currentDate);
      paymentDate.setMonth(paymentDate.getMonth() + i + 1);
      
      payments.push({
        date: paymentDate,
        amount: monthlyPayment,
        principal,
        interest,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }
    
    return payments;
  };
  
  const payments = calculatePaymentSchedule();
  
  // Format date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">Calendario de Pagos</h3>
      </div>
      
      <div className="px-4 py-3 max-h-64 overflow-y-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cuota
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Restante
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {payments.map((payment, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">
                  {formatDate(payment.date)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-gray-900 font-medium">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-gray-600 hidden sm:table-cell">
                  {formatCurrency(payment.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentCalendar;