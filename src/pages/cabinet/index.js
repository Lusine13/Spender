import React, { useState } from "react"; 
import { Form, Button, Input, DatePicker, Select, Flex, Typography, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { addWalletEvent } from '../../state-managment/slices/walletEvents';  
import { auth } from '../../firebase';
import AuthWrapper from '../../components/sheared/AuthWrapper';
import { useNavigate } from "react-router-dom";
import transactionBanner from '../../core/images/money3.jpg';
import dayjs from 'dayjs';  
import { Categories } from '../../core/utils/constants';  

const { Title } = Typography;

const Cabinet = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userUID = auth.currentUser?.uid;    
    const currentDate = dayjs();

    const handleTransaction = async (values) => {
        const { category, amount } = values;
        setLoading(true);      
        try {
             dispatch(addWalletEvent({ uid: userUID, category, amount }));           
            notification.success({
                message: 'Transaction Successful',
                description: `You have successfully added ${amount} to the ${category} category.`,
                placement: 'topRight', 
                duration: 3,
            });            
            form.resetFields();  
        } catch (e) {
            console.error(e);
            notification.error({
                message: 'Transaction Failed',
                description: 'There was an error processing your transaction. Please try again.',
                placement: 'topRight',
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthWrapper title="Transaction Details" banner={transactionBanner}>
            <Form layout="vertical" form={form} onFinish={handleTransaction}>            
                <Form.Item
                    label="Date"
                    name="date"
                    initialValue={currentDate}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the date!'
                        }
                    ]}
                >
                    <DatePicker placeholder="Select Date" format="YYYY-MM-DD" />
                </Form.Item>             
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a category!'
                        }
                    ]}
                >
                    <Select placeholder="Select Category">
                        {Categories.map(category => (
                            <Select.Option key={category.value} value={category.value}>
                                {category.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>              
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please Input Positive Amount",
                            validator: (_, value) => {
                                if (!value || value <= 0) {
                                    return Promise.reject("Amount must be a positive number");
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input type="number" placeholder="Please Enter The Amount" />
                </Form.Item>

                <Flex align="flex-end" gap="10px" justify="flex-end">
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Flex>
            </Form>
        </AuthWrapper>
    );
};

export default Cabinet;
