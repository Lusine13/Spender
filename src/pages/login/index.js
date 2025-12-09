import { useState } from 'react';
import { Form, Input, Button, notification, Flex} from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import AuthWrapper from '../../components/sheared/AuthWrapper';
import { useDispatch } from 'react-redux';
import { fetchUserProfileInfo } from '../../state-managment/slices/userProfile';
import { regexpValidation, ROUTE_CONSTANTS } from '../../core/utils/constants';
import loginBanner from '../../core/images/money.jpg';



const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [ form ] = Form.useForm();

  const handleLogin = async values => {
    setLoading(true);
    try {
        const { email, password } = values;
        await signInWithEmailAndPassword(auth, email, password);
        form.resetFields();
        dispatch(fetchUserProfileInfo());
    } catch (error) {
        notification.error( {
          message: 'Invalid Login Credentials',
        });
    } finally {
        setLoading(false);
    }    
  };


  return (
    <AuthWrapper title="Sign in" banner={loginBanner}>
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item 
        label="Email"
        name="email"
        rules={[
            {
                required: true,
                message: 'Please input your email'
            }
        ]}
        >
          <Input type="email" placeholder="Email"/>
        </Form.Item>

        <Form.Item 
        label="Password"
        name="password"
        rules={[
            {
                required: true,
                message: 'Please input your password'
            },
            {
                pattern:  regexpValidation,
                message: 'Wrong password'
            }
        ]}
        >
          <Input.Password placeholder="Password"/>
        </Form.Item>  
        <Flex justify="space-between" align="center">
        <Link to={ROUTE_CONSTANTS.REGISTER} style={{ fontSize: "16px", fontWeight: 500 }}>Create account</Link>
        <Button type="primary" loading={loading} size="large" htmlType="submit">
            Sign in
        </Button>
        </Flex>        
      </Form>
    </AuthWrapper>
  )
}

export default Login;