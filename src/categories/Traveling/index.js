import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletEvents } from '../../state-managment/slices/walletEvents';  
import { Card, List, Typography, Row, Col, Statistic, Spin, Button } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';  

const { Title } = Typography;

const Traveling = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const auth = getAuth();  
    const userUID = auth.currentUser ? auth.currentUser.uid : null;     
    
    const { data, isLoading, currency } = useSelector(state => state.walletEvents);   
    const travelingTransactions = data.filter(event => event.category === 'traveling');  
    
    const [convertedTransactions, setConvertedTransactions] = useState([]);
    
    const fetchExchangeRate = async (fromCurrency, toCurrency) => {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency?.toUpperCase()] || 1; 
    };
    
    const convertAmounts = useCallback(async () => {
        const convertedData = await Promise.all(travelingTransactions.map(async (transaction) => {
            const fromCurrency = transaction.currency || 'USD';  
            const rate = await fetchExchangeRate(fromCurrency, currency);
            const convertedAmount = transaction.amount * rate;  
            return {
                ...transaction,
                convertedAmount
            };
        }));
        setConvertedTransactions(convertedData);
    }, [travelingTransactions, currency]);
    
    const totalSpentOnTraveling = convertedTransactions.reduce((total, event) => total + Number(event.convertedAmount), 0);

    useEffect(() => {        
        if (userUID) {
            dispatch(fetchWalletEvents(userUID));  
        }
    }, [dispatch, userUID]);
    
   
    useEffect(() => {
        if (travelingTransactions.length > 0 && currency) {
            convertAmounts();  
        }
    }, [travelingTransactions, currency, convertAmounts]);

    return (
        <div style={{ padding: '5px' }}>           
            <Button
                type="primary"
                onClick={() => navigate('/cabinet')}  
                style={{ marginBottom: '20px' }}              
            >
                Back to Cabinet
            </Button>
            <Title level={2}>Traveling Expenses Transactions</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Card>                        
                        <Statistic 
                            title="Total Spent on Traveling" 
                            value={totalSpentOnTraveling} 
                            prefix={currency?.toUpperCase() || '$'}  
                        />
                    </Card>
                </Col>
            </Row>

            {isLoading ? (
                <Spin size="large" />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={convertedTransactions} 
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
    );
};

export default Traveling;
