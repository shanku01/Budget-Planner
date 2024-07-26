import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Define types for user information and expenses
interface UserInfo {
  name: string;
  email: string;
  currency: string;
}

interface Expense {
  name: string;
  amount: number;
}

interface BudgetData {
  userInfo: UserInfo;
  income: number;
  expenses: Expense[];
}

// Define the shape of the context value
interface BudgetContextType {
  budgetData: BudgetData;
  setBudgetData: React.Dispatch<React.SetStateAction<BudgetData>>;
}

// Create the context with a default value
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

interface BudgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  // Initialize local storage with default values
  const [budgetData, setBudgetData] = useLocalStorage<BudgetData>('budgetData', {
    userInfo: { name: '', email: '', currency: 'USD' },
    income: 0,
    expenses: [],
  });

  return (
    <BudgetContext.Provider value={{ budgetData, setBudgetData }}>
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook for using the BudgetContext
export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
