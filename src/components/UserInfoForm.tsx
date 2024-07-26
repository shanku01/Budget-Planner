import React, { useState, ChangeEvent, useEffect } from 'react';
import { useBudget } from '../context/BudgetContext';
import { fetchCurrencies } from '../services/currencyApi';

interface UserInfoFormProps {
  nextStep: () => void;
}

interface Errors {
  name?: string;
  email?: string;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ nextStep }) => {
  const { budgetData, setBudgetData } = useBudget();
  const { name, email, currency } = budgetData.userInfo;
  const [errors, setErrors] = useState<Errors>({});
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const getCurrencies = async () => {
      const currencies = await fetchCurrencies();
      setCurrencies(currencies);
    };
    getCurrencies();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBudgetData((prevData) => ({
      ...prevData,
      userInfo: { ...prevData.userInfo, [name]: value },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleNext = () => {
    let validationErrors: Errors = {};
    if (!name) validationErrors.name = 'Name is required';
    if (!email) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) validationErrors.email = 'Email is invalid'; // Added email validation

    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='userInfo'>
      <h2>User Information</h2>
      <form>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <select name="currency" value={currency} onChange={handleChange}>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </form>
      <button className="form-button" type="button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default UserInfoForm;
