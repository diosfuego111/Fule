import React, { useEffect, useRef } from 'react';

interface PaymentChartProps {
  principal: number;
  interest: number;
  term: number;
}

const PaymentChart: React.FC<PaymentChartProps> = ({ principal, interest, term }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calculate total interest
  const totalInterest = interest * term;
  
  // Calculate percentages
  const principalPercentage = (principal / (principal + totalInterest)) * 100;
  const interestPercentage = (totalInterest / (principal + totalInterest)) * 100;
  
  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Colors
    const principalColor = '#3b82f6'; // Blue
    const interestColor = '#f97316'; // Orange
    
    // Draw principal segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius,
      -0.5 * Math.PI,
      (principalPercentage / 100) * Math.PI * 2 - 0.5 * Math.PI,
      false
    );
    ctx.closePath();
    ctx.fillStyle = principalColor;
    ctx.fill();
    
    // Draw interest segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius,
      (principalPercentage / 100) * Math.PI * 2 - 0.5 * Math.PI,
      1.5 * Math.PI,
      false
    );
    ctx.closePath();
    ctx.fillStyle = interestColor;
    ctx.fill();
    
    // Draw inner circle (hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2, false);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
  }, [principal, totalInterest, principalPercentage, interestPercentage]);
  
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
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas ref={canvasRef} width={200} height={200} className="mb-4"></canvas>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <p className="text-gray-500 text-xs">Pago Total</p>
            <p className="text-gray-900 font-semibold">
              {formatCurrency(principal + totalInterest)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <div>
            <p className="text-xs text-gray-500">Capital</p>
            <p className="text-sm font-medium">{formatCurrency(principal)}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
          <div>
            <p className="text-xs text-gray-500">Interés</p>
            <p className="text-sm font-medium">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentChart;