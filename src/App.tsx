import React from 'react';
import { BudgetProvider } from './context/BudgetContext';
import MultiStepForm from './components/MultiStepForm';
import './styles/styles.css';

const App = () => (
  <BudgetProvider>
    <div className="App">
      <MultiStepForm />
    </div>
  </BudgetProvider>
);

export default App;
