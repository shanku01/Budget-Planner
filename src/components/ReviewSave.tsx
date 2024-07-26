import React from 'react';
import { useBudget } from '../context/BudgetContext';

interface ReviewSaveProps {
  prevStep: () => void;
}

const ReviewSave: React.FC<ReviewSaveProps> = ({ prevStep }) => {
  const { budgetData } = useBudget();
  const { userInfo, income, expenses } = budgetData;

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remainingBudget = income - totalExpenses;

  const handleSave = () => {
    try {
      localStorage.setItem('budgetData', JSON.stringify(budgetData));
      alert('Budget data saved!');
    } catch (error) {
      console.error('Error saving budget data:', error);
      alert('Failed to save budget data.');
    }
  };

  return (
    <div className="review-save">
      <h2>Review and Save</h2>
      <div className="review-section">
        <h3>User Information</h3>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <p>Preferred Currency: {userInfo.currency}</p>
      </div>
      <div className="review-section">
        <h3>Income</h3>
        <p>Monthly Income: {income.toFixed(2)}</p>
      </div>
      <div className="review-section">
        <h3>Expenses</h3>
        <ul className="expenses-list">
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <li key={index} className="expense-item">
                {expense.name}: {expense.amount.toFixed(2)}
              </li>
            ))
          ) : (
            <li>No expenses recorded.</li>
          )}
        </ul>
      </div>
      <div className="review-section">
        <h3>Remaining Budget</h3>
        <p>{remainingBudget.toFixed(2)}</p>
      </div>
      <div className="navigation-buttons">
        <button onClick={prevStep} className="form-button">Previous</button>
        <button onClick={handleSave} className="form-button">Save</button>
      </div>
    </div>
  );
};

export default ReviewSave;
