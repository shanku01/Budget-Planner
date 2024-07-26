export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  try {
    
    if (!fromCurrency || typeof fromCurrency !== 'string' || !toCurrency || typeof toCurrency !== 'string') {
      throw new Error('Invalid currency code(s)');
    }

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch currency conversion rates');
    }

    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) {
      throw new Error(`Conversion rate for currency ${toCurrency} not found`);
    }

    return amount * rate;
  } catch (error) {
    console.error('Error fetching currency conversion rates:', error);
    return amount; 
  }
};


export const fetchCurrencies = async () => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return Object.keys(data.rates);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        return []; 
    }
};