import React, { useEffect, useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { fetchCurrencies, convertCurrency } from '../services/currencyApi';

interface BudgetSummaryProps {
  nextStep: () => void;
  prevStep: () => void;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ nextStep, prevStep }) => {
  const { budgetData } = useBudget();
  const { income, expenses, userInfo } = budgetData;
  const [remainingBudget, setRemainingBudget] = useState<number>(income);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const selectedCurrency = userInfo.currency; 
  const [newSelectedCurrency, setNewSelectedCurrency] = useState<string>(userInfo.currency); 
  const [convertedIncome, setConvertedIncome] = useState<number>(income);
  const [convertedExpenses, setConvertedExpenses] = useState<number>(0);

  useEffect(() => {
    const fetchAndSetCurrencies = async () => {
      const availableCurrencies = await fetchCurrencies();
      setCurrencies(availableCurrencies);
    };
    
    fetchAndSetCurrencies();
  }, []);

  useEffect(() => {
    const calculateBudget = async () => {
      try {
        const totalExpenses = await Promise.all(
          expenses.map(async (expense) => convertCurrency(expense.amount, selectedCurrency, newSelectedCurrency))
        ).then((convertedExpenses) => convertedExpenses.reduce((acc, amount) => acc + amount, 0));

        const convertedIncome = await convertCurrency(income, selectedCurrency, newSelectedCurrency);
        const convertedRemainingBudget = convertedIncome - totalExpenses;

        setConvertedIncome(convertedIncome);
        setConvertedExpenses(totalExpenses);
        setRemainingBudget(convertedRemainingBudget);
      } catch (error) {
        console.error('Error calculating budget:', error);
      }
    };

    calculateBudget();
  }, [income, expenses, selectedCurrency]);

  const handleCurrencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setNewSelectedCurrency(newCurrency);

    try {
      const totalExpenses = await Promise.all(
        expenses.map(async (expense) => convertCurrency(expense.amount, selectedCurrency, newCurrency))
      ).then((convertedExpenses) => convertedExpenses.reduce((acc, amount) => acc + amount, 0));

      const convertedIncome = await convertCurrency(income, selectedCurrency, newCurrency);
      const convertedRemainingBudget = convertedIncome - totalExpenses;

      setConvertedIncome(convertedIncome);
      setConvertedExpenses(totalExpenses);
      setRemainingBudget(convertedRemainingBudget);
    } catch (error) {
      console.error('Error updating budget data:', error);
    }
  };

  return (
    <div className="budget-summary">
      <h2>Budget Summary</h2>
      <div className="currency-selector">
        <label htmlFor="currency">Select Currency to Convert:</label>
        <select id="currency" value={newSelectedCurrency} onChange={handleCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="summary-row">
        <div className="summary-item">
          <span>Total Income:</span>
          <span>{convertedIncome.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Total Expenses:</span>
          <span>{convertedExpenses.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Remaining Budget:</span>
          <span>{remainingBudget.toFixed(2)}</span>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={prevStep} className="form-button">Previous</button>
        <button onClick={nextStep} className="form-button">Next</button>
      </div>
    </div>
  );
};

export default BudgetSummary;
