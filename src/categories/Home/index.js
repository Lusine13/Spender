import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletEvents } from '../../state-managment/slices/walletEvents'; 
import { Card, List, Typography, Row, Col, Statistic, Spin, Button } from 'antd'; 
import { useNavigate } from 'react-router-dom';  
import { getAuth } from 'firebase/auth';  

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  
  const auth = getAuth();  
  const userUID = auth.currentUser ? auth.currentUser.uid : null;  
  
  const { data, isLoading } = useSelector(state => state.walletEvents);
 
  useEffect(() => {
    if (userUID) {
      dispatch(fetchWalletEvents(userUID)); 
    }
  }, [dispatch, userUID]);

  const homeTransactions = data.filter(event => event.category === 'home');
  const totalSpentOnHome = homeTransactions.reduce((total, event) => total + Number(event.amount), 0);

  return (
    <div style={{ padding: '24px' }}>           
      <Button
        type="primary"
        onClick={() => navigate('/cabinet')}                
      >
        Back to Cabinet
      </Button>

      <Title level={2}>Home Transactions</Title>
   
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Card>
            <Statistic title="Total Spent on Home" value={totalSpentOnHome} prefix="$" />
          </Card>
        </Col>
      </Row>

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={homeTransactions}
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

export default Home;
