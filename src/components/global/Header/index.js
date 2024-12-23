import React, { useEffect } from 'react';
import { Button, Select, Flex } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrency, fetchCurrency, addWalletEvent } from '../../../state-managment/slices/walletEvents'; 
import AuthProfileDropDown from '../../sheared/AuthProfileDropDown';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../../core/utils/constants';
import { fetchUserProfileInfo } from "../../../state-managment/slices/userProfile";
import { saveCurrencyToFirestore } from '../../../core/utils/helpers/currencyEvents';  
import { CURRENCY_ITEMS } from '../../../core/utils/constants'; 

import './index.css';


const Header = () => {
  const dispatch = useDispatch();
  const { authUserInfo: { isAuth, userData } } = useSelector((store) => store.userProfile);
  const { currency } = useSelector((store) => store.walletEvents); 
  
  
  useEffect(() => {
    if (isAuth && userData?.uid) {
      dispatch(fetchCurrency(userData.uid));  
    }
  }, [dispatch, isAuth, userData]);

  const handleCurrencyChange = async (newCurrency) => {
    const fromCurrency = currency; 
    const uid = userData?.uid; 
      
    dispatch(setCurrency(newCurrency));  
    
    if (uid) {      
      await saveCurrencyToFirestore(uid, newCurrency);
    }
  
      const fetchExchangeRate = async (fromCurrency, toCurrency) => {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      if (toCurrency) {
        return data.rates[toCurrency?.toUpperCase()]; 
      } else {
        return 1; 
      }
    };
  
    const rate = await fetchExchangeRate(fromCurrency, newCurrency);    
    if (uid) {
      const category = 'Currency Change'; 
      const amount = rate; 
      const date = new Date().toISOString();      
      dispatch(addWalletEvent({ uid, category, amount, date }));
    }    
    dispatch(fetchUserProfileInfo());
  };

  return ( 
    <div className="main_header">
      <Flex justify="space-between" align="center">
        <div className="header">
          SPENDER
        </div>
        <div className="currency-container">
          <Select
            options={CURRENCY_ITEMS}  
            value={currency}
            onChange={handleCurrencyChange}  
            className="select"
          />
        </div>
        <div className="dropdown-container">        
          {isAuth && userData ? (
            <AuthProfileDropDown userProfileInfo={userData} />
          ) : (
            <Link to={ROUTE_CONSTANTS.LOGIN}>
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Header;
