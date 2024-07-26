import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, nextStep, prevStep }) => {
  return (
    <div className="step-navigation">
      <button 
        onClick={prevStep} 
        disabled={currentStep <= 1}
      >
        Previous
      </button>
      <button 
        onClick={nextStep} 
        disabled={currentStep >= 4}
      >
        Next
      </button>
    </div>
  );
};

export default StepNavigation;
