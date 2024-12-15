import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWalletEvent } from '../../state-managment/slices/walletEvents';
import { Card, Row, Col, Statistic, Spin, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Balance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { data, isLoading, error, currency } = useSelector(state => state.walletEvents); 
    const { authUserInfo } = useSelector(state => state.userProfile); 
    const userUID = authUserInfo?.uid;         
    const [convertedData, setConvertedData] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
    });
    
    const fetchExchangeRate = async (fromCurrency, toCurrency) => {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency?.toUpperCase()] || 1; 
    };

    
    const convertAmounts = async () => {
        const incomeTransactions = data.filter(event => event.category === 'income');
        const expenseTransactions = data.filter(event => event.category !== 'income');        
        const rate = await fetchExchangeRate('USD', currency);  
        const convertedIncome = incomeTransactions.reduce((total, event) => total + (Number(event.amount) * rate), 0);
        const convertedExpenses = expenseTransactions.reduce((total, event) => total + (Number(event.amount) * rate), 0);
        const convertedBalance = convertedIncome - convertedExpenses;

        setConvertedData({
            totalIncome: convertedIncome,
            totalExpenses: convertedExpenses,
            balance: convertedBalance,
        });
    };

    useEffect(() => {
        if (userUID) {
            dispatch(addWalletEvent(userUID)); 
        }
    }, [dispatch, userUID]);
    
    useEffect(() => {
        if (currency && data.length > 0) {
            convertAmounts(); 
        }
    }, [currency, data]);

    if (error) {
        message.error("Error fetching data.");
    }

    return (
        <div style={{ padding: '5px' }}>
            <Button
                type="primary"
                onClick={() => navigate('/cabinet')}                
            >
                Back to Cabinet
            </Button>
            <h2>Balance</h2>            

            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Card>                        
                        <Statistic 
                            title="Total Income" 
                            value={convertedData.totalIncome} 
                            prefix={currency?.toUpperCase() || '$'}  
                            style={{ marginBottom: '10px' }}
                        />                        
                        <Statistic 
                            title="Total Expenses" 
                            value={convertedData.totalExpenses} 
                            prefix={currency?.toUpperCase() || '$'} 
                            style={{ marginBottom: '10px' }}
                        />                        
                        <Statistic 
                            title="Balance" 
                            value={convertedData.balance} 
                            prefix={currency?.toUpperCase() || '$'}  
                            valueStyle={{ color: convertedData.balance >= 0 ? 'green' : 'red' }} 
                        />
                    </Card>
                </Col>
            </Row>

            {isLoading ? (
                <Spin size="large" />
            ) : (
                <div>
                    {data.length === 0 && <p>No transactions available.</p>}
                </div>
            )}
        </div>
    );
};

export default Balance;
