import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWalletEvent } from '../../state-managment/slices/walletEvents';
import { Card, Row, Col, Statistic, Spin, message, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Balance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector(state => state.walletEvents); 
    const { authUserInfo } = useSelector(state => state.userProfile); 
    const userUID = authUserInfo?.uid;     

    const incomeTransactions = data.filter(event => event.category === 'income');
    const expenseTransactions = data.filter(event => event.category !== 'income');
   
    const totalIncome = incomeTransactions.reduce((total, event) => total + Number(event.amount), 0); 
    const totalExpenses = expenseTransactions.reduce((total, event) => total + Number(event.amount), 0);    
    const balance = totalIncome - totalExpenses;

    useEffect(() => {
        if (userUID) {
            dispatch(addWalletEvent(userUID)); 
        }
    }, [dispatch, userUID]);

    if (error) {
        message.error("Error fetching data.");
    }

    return (
        <div style={{ padding: '24px' }}>          
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
                            value={totalIncome} 
                            prefix="$" 
                            style={{ marginBottom: '10px' }}
                        />
                        <Statistic 
                            title="Total Expenses" 
                            value={totalExpenses} 
                            prefix="$" 
                            style={{ marginBottom: '10px' }}
                        />
                        <Statistic 
                            title="Balance" 
                            value={balance} 
                            prefix="$" 
                            valueStyle={{ color: balance >= 0 ? 'green' : 'red' }} 
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
