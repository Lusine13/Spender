import { Avatar, Dropdown, Typography, Flex, theme } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { ROUTE_CONSTANTS } from '../../../core/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../../state-managment/slices/userProfile';

import './index.css';

const { useToken } = theme;
const { Text } = Typography;

const getFullNameLetter = (userProfileInfo) => {   
    if (userProfileInfo && userProfileInfo.firstName && userProfileInfo.lastName) {
        return `${userProfileInfo.firstName[0]} ${userProfileInfo.lastName[0]}`;
    }
    return '-'; 
}

const AuthProfileDropDown = ({ userProfileInfo }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useToken();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            dispatch(setIsAuth(false));
        } catch (e) {
            console.log(e, `signOut error`);
        }
    };

   

    const items = [
        {
            label: 'Cabinet',
            key: '0',
            onClick: () => navigate(ROUTE_CONSTANTS.CABINET),
        },
        {
            label: 'Income',
            key: '1',
            onClick: () => navigate(ROUTE_CONSTANTS.INCOME),
        },
        {
            label: 'Balance',
            key: '2',
            onClick: () => navigate(ROUTE_CONSTANTS.BALANCE),
        },
        {
            label: 'Logout',
            key: 'logout',
            onClick: handleSignOut,
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            dropdownRender={(menu) => (
                <div
                    style={{
                        borderRadius: token.borderRadiusLG,
                        backgroundColor: token.colorBgElevated,
                        boxShadow: token.boxShadowSecondary,
                    }}
                >
                    <Flex vertical align="center" style={{ padding: token.sizeMS }}>
                        <Text>{userProfileInfo.firstName} {userProfileInfo.lastName}</Text>
                    </Flex>
                    {menu}
                </div>
            )}
        >
            <Avatar size="large" className="user_profile_avatar">
                {getFullNameLetter(userProfileInfo)}
            </Avatar>
        </Dropdown>
    );
};

export default AuthProfileDropDown;
