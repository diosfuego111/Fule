import React, { useState, useRef, useEffect } from 'react';

interface SliderInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatLabel?: (value: number) => string;
  unit?: string;
  labelMin?: string;
  labelMax?: string;
  color?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  formatLabel = (val) => val.toString(),
  unit = '',
  labelMin,
  labelMax,
  color = 'bg-blue-600'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Calculate percentage for slider position
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Handle slider thumb movement
  const handleMove = (clientX: number) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const trackWidth = rect.width;
    const position = clientX - rect.left;
    
    // Calculate new value based on position
    let newPosition = Math.max(0, Math.min(position, trackWidth));
    let newValue = min + (newPosition / trackWidth) * (max - min);
    
    // Apply step if provided
    if (step) {
      newValue = Math.round(newValue / step) * step;
    }
    
    // Ensure value is within bounds
    newValue = Math.max(min, Math.min(newValue, max));
    
    onChange(newValue);
  };
  
  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };
  
  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };
  
  // Effect for global mouse/touch move and up/end events
  useEffect(() => {
    if (!isDragging) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };
    
    const handleEnd = () => {
      setIsDragging(false);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);
  
  return (
    <div className="relative py-6">
      {/* Current value display */}
      <div className="text-center mb-6">
        <span className="text-4xl font-medium text-gray-900">
          {formatLabel(value)}{unit}
        </span>
      </div>
      
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Filled track */}
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${color} transition-all duration-150`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Thumb */}
        <div
          className={`absolute top-1/2 h-6 w-6 -mt-3 -ml-3 rounded-full bg-white shadow-md border-2 border-blue-600 transform transition-all duration-150 ${
            isDragging ? 'scale-110' : ''
          }`}
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{labelMin || formatLabel(min)}{unit}</span>
        <span>{labelMax || formatLabel(max)}{unit}</span>
      </div>
    </div>
  );
};

export default SliderInput;