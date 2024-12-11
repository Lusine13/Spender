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
