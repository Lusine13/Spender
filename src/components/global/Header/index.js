import { Button, Flex } from 'antd';
import AuthProfileDropDown from '../../sheared/AuthProfileDropDown';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../../core/utils/constants';
import { useSelector } from 'react-redux';
import './index.css';


const Header = () => {
     const { authUserInfo: { isAuth, userData } } = useSelector((store) => store.userProfile);

     return (
        <div className="main_header">
            <Flex justify="space-between" align="center">  
        <div className='header'>
           SPENDER
        </div>            
        <div className='dropdown-container'>
            {
                isAuth ? <AuthProfileDropDown userProfileInfo={userData}/> 
                : <Link to={ROUTE_CONSTANTS.LOGIN}><Button>Sign in</Button></Link>
            }        
        </div>
        </Flex>
        </div>
    )
};

export default Header;