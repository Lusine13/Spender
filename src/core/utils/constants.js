import CurrencyFlag from 'react-currency-flags'; 

export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const ROUTE_CONSTANTS  = {
  LOGIN: '/login',
  REGISTER: '/register',
  CABINET: '/cabinet',
  HOME: '/cabinet/home',
  SHOPPING: '/cabinet/shopping',
  EDUCATION: '/cabinet/education',
  CAR: '/cabinet/car',
  EATING_OUT: '/cabinet/eating_out',
  TRAVELING: '/cabinet/traveling',
  OTHEREXPENSES: '/cabinet/otherexpenses',
  INCOME: '/cabinet/income',
  BALANCE: '/cabinet/balance'  
}

export const Categories = [
  { label: 'Home', value: 'home' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Education', value: 'education' },
  { label: 'Car', value: 'car' },
  { label: 'Eating_Out', value: 'eating_out' },
  { label: 'Traveling', value: 'traveling' },
  { label: 'OtherExpenses', value: 'other_expenses' },
  { label: 'Income', value: 'income' },
   
]

export const FIRESTORE_PATH_NAMES = {
  REGISTERED_USERS: 'registered_users', 
  WALLET_EVENTS: 'wallet_events',
}

export const CURRENCY_ITEMS = [
  { label: <><CurrencyFlag currency="USD" style={{ marginRight: 8, width: 20 }} /> USD</>, value: "usd" },
  { label: <><CurrencyFlag currency="EUR" style={{ marginRight: 8, width: 20 }} /> EUR</>, value: "eur" },
  { label: <><CurrencyFlag currency="AMD" style={{ marginRight: 8, width: 20 }} /> AMD</>, value: "amd" },
  { label: <><CurrencyFlag currency="JPY" style={{ marginRight: 8, width: 20 }} /> JPY</>, value: "jpy" },
  { label: <><CurrencyFlag currency="AUD" style={{ marginRight: 8, width: 20 }} /> AUD</>, value: "aud" },
  { label: <><CurrencyFlag currency="CAD" style={{ marginRight: 8, width: 20 }} /> CAD</>, value: "cad" },
  { label: <><CurrencyFlag currency="CHF" style={{ marginRight: 8, width: 20 }} /> CHF</>, value: "chf" },
  { label: <><CurrencyFlag currency="CNY" style={{ marginRight: 8, width: 20 }} /> CNY</>, value: "cny" },
  { label: <><CurrencyFlag currency="INR" style={{ marginRight: 8, width: 20 }} /> INR</>, value: "inr" },
  { label: <><CurrencyFlag currency="MXN" style={{ marginRight: 8, width: 20 }} /> MXN</>, value: "mxn" },
  { label: <><CurrencyFlag currency="BRL" style={{ marginRight: 8, width: 20 }} /> BRL</>, value: "brl" },
  { label: <><CurrencyFlag currency="RUB" style={{ marginRight: 8, width: 20 }} /> RUB</>, value: "rub" },
];
