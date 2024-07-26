import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

interface IncomeExpensesFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

const IncomeExpensesForm: React.FC<IncomeExpensesFormProps> = ({ nextStep, prevStep }) => {
  const { budgetData, setBudgetData } = useBudget();
  const { income, expenses } = budgetData;
  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'income') {
      const numericValue = parseFloat(value);
      setBudgetData((prevData) => ({
        ...prevData,
        income: isNaN(numericValue) ? 0 : numericValue,
      }));
    }
  };

  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (expenseName && !isNaN(amount)) {
      setBudgetData((prevData) => ({
        ...prevData,
        expenses: [
          ...prevData.expenses,
          { name: expenseName, amount },
        ],
      }));
      setExpenseName('');
      setExpenseAmount('');
    } else {
      alert('Please enter both name and a valid amount for the expense.');
    }
  };

  const removeExpense = (index: number) => {
    setBudgetData((prevData) => ({
      ...prevData,
      expenses: prevData.expenses.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h2>Income and Expenses</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="income"
            className='income-input'
            value={income === 0 ? '' : income} 
            onChange={handleChange}
            placeholder="Monthly Income"
          />
        </div>
        <h3>Expenses</h3>
        <div className="expense-input-group">
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="Expense Name"
            className="expense-name-input"
          />
          <input
            type="text"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Expense Amount"
            className="expense-amount-input"
          />
          <button type="button" onClick={addExpense} className="add-expense-button">Add Expense</button>
        </div>
        <ul className="expense-list">
          {expenses.map((expense, index) => (
            <li key={index} className="expense-item">
              <span className="expense-name">{expense.name}</span>
              <span className="expense-amount">{expense.amount}</span>
              <button type="button" onClick={() => removeExpense(index)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
      </form>
      <div className="navigation-buttons">
        <button onClick={prevStep} className="form-button">Previous</button>
        <button onClick={nextStep} className="form-button">Next</button>
      </div>
    </div>
  );
};

export default IncomeExpensesForm;
