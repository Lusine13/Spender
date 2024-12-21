import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWalletEvent } from '../../state-managment/slices/walletEvents';
import { Card, List, Typography, Row, Col, Statistic, Spin, Button, Alert } from 'antd'; 
import { useNavigate } from 'react-router-dom';  

const { Title } = Typography;

const Income = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();    

    const { data, isLoading, error, currency } = useSelector(state => state.walletEvents); 
    const { authUserInfo } = useSelector(state => state.userProfile); 
    const userUID = authUserInfo?.uid;      
    
    const [convertedIncomeTransactions, setConvertedIncomeTransactions] = useState([]);
    
    const fetchExchangeRate = async (fromCurrency, toCurrency) => {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency?.toUpperCase()] || 1; 
    };
    
    const convertIncomeAmounts = async () => {
        const convertedData = await Promise.all(incomeTransactions.map(async (transaction) => {
            const fromCurrency = transaction.currency || 'USD';  
            const rate = await fetchExchangeRate(fromCurrency, currency);  
            const convertedAmount = transaction.amount * rate;  
            return {
                ...transaction,
                convertedAmount
            };
        }));
        setConvertedIncomeTransactions(convertedData);
    };

    
    const totalIncome = convertedIncomeTransactions.reduce((total, event) => total + Number(event.convertedAmount), 0);

    useEffect(() => {
        if (userUID) {
            dispatch(addWalletEvent(userUID)); 
        }
    }, [dispatch, userUID]);

    const incomeTransactions = data.filter(event => event.category === 'income');

    useEffect(() => {
        if (incomeTransactions.length > 0 && currency) {
            convertIncomeAmounts();  
        }
    }, [incomeTransactions, currency, convertAmounts]);

    if (error) {
        return (
            <div style={{ padding: '5px' }}>
                <Alert message="Error fetching income data" type="error" showIcon />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Button
                type="primary"
                onClick={() => navigate('/cabinet')}                
            >
                Back to Cabinet
            </Button>
            <Title level={2}>Income</Title>
            
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Card>
                        <Statistic 
                            title="Total Income" 
                            value={totalIncome} 
                            prefix={currency?.toUpperCase() || '$'} 
                        />
                    </Card>
                </Col>
            </Row>

            {isLoading ? (
                <Spin size="large" />
            ) : (
                <div>
                    {convertedIncomeTransactions.length === 0 ? (
                        <p>No income transactions found.</p>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={convertedIncomeTransactions}  
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`${item.convertedAmount} ${currency?.toUpperCase() || '$'}`} 
                                        description={`${item.date} - ${item.category}`}
                                    />
                                </List.Item>
                            )}
                            style={{ maxHeight: '400px', overflowY: 'auto' }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Income;
