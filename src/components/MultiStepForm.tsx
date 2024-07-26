import React, { useState } from 'react';
import UserInfoForm from './UserInfoForm';
import IncomeExpensesForm from './IncomeExpensesForm';
import BudgetSummary from './BudgetSummary';
import ReviewSave from './ReviewSave';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <UserInfoForm nextStep={nextStep} />;
    case 2:
      return <IncomeExpensesForm nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <BudgetSummary nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <ReviewSave prevStep={prevStep} />;
    default:
      return <UserInfoForm nextStep={nextStep} />;
  }
};

export default MultiStepForm;
