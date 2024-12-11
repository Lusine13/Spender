import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletEvents } from '../../state-managment/slices/walletEvents'; 
import { Card, List, Typography, Row, Col, Statistic, Spin, Button } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';  

const { Title } = Typography;

const Shopping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();  
    const userUID = auth.currentUser ? auth.currentUser.uid : null;      
    const { data, isLoading } = useSelector(state => state.walletEvents);      
    const shoppingTransactions = data.filter(event => event.category === 'shopping');    
    const totalSpentOnShopping = shoppingTransactions.reduce((total, event) => total + Number(event.amount), 0);    

    useEffect(() => {        
        if (userUID) {
            dispatch(fetchWalletEvents(userUID));  
        }
    }, [dispatch, userUID]);

    return (
        <div style={{ padding: '24px' }}>           
            <Button
                type="primary"
                onClick={() => navigate('/cabinet')}                
            >
                Back to Cabinet
            </Button>
            <Title level={2}>Shopping Transactions</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Card>
                        <Statistic title="Total Spent on Shopping" value={totalSpentOnShopping} prefix="$" />
                    </Card>
                </Col>
            </Row>

            {isLoading ? (
                <Spin size="large" />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={shoppingTransactions}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`${item.amount} USD`}
                                description={`${item.date} - ${item.category}`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default Shopping;
