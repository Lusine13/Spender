import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWalletEvent } from '../../state-managment/slices/walletEvents';
import { Card, List, Typography, Row, Col, Statistic, Spin, Button, Alert } from 'antd'; 
import { useNavigate } from 'react-router-dom'; 

const { Title } = Typography;

const Income = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const { data, isLoading, error } = useSelector(state => state.walletEvents); 
    const { authUserInfo } = useSelector(state => state.userProfile); 
    const userUID = authUserInfo?.uid;         
    const incomeTransactions = data.filter(event => event.category === 'income');        
    const totalIncome = incomeTransactions.reduce((total, event) => total + Number(event.amount), 0);
    
    useEffect(() => {
        if (userUID) {
            dispatch(addWalletEvent(userUID)); 
        }
    }, [dispatch, userUID]);
    
    if (error) {
        return (
            <div style={{ padding: '24px' }}>
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
            
            {/* Display total income */}
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Card>
                        <Statistic title="Total Income" value={totalIncome} prefix="$" />
                    </Card>
                </Col>
            </Row>
          
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <div>
                    {incomeTransactions.length === 0 ? (
                        <p>No income transactions found.</p>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={incomeTransactions}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`${item.amount} $`}
                                        description={`${item.date} - ${item.category}`}
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Income;
