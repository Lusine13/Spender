import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { ROUTE_CONSTANTS } from '../../../core/utils/constants';
import './index.css';

import houseImage from '../../../core/images/house.jpg';
import shoppingImage from '../../../core/images/shopping.jpg';
import educationImage from '../../../core/images/education.jpg';
import carImage from '../../../core/images/car.jpg';
import eatingOutImage from '../../../core/images/eatingout.jpg';
import travelImage from '../../../core/images/travel.jpg';
import otherImage from '../../../core/images/other.jpg';
import incomeImage from '../../../core/images/income.jpg';

const { Sider, Content } = Layout;

const menuItems = [
    {
        label: 'HOME',
        key: ROUTE_CONSTANTS.HOME,
        icon: <img src={houseImage} alt="Home" style={{ width: 100, height: 80}} />,
        className: 'menu_item'
    },
    {
        label: 'SHOPPING',
        key: ROUTE_CONSTANTS.SHOPPING,
        icon: <img src={shoppingImage} alt="Shopping" style={{ width: 100, height: 80 }} />,
        className: 'menu_item'
    },
    {
        label: 'EDUCATION',
        key: ROUTE_CONSTANTS.EDUCATION,
        icon: <img src={educationImage} alt="Education" style={{ width: 100, height: 80 }} />,
        className: 'menu_item'
    },
    {
        label: 'CAR',
        key: ROUTE_CONSTANTS.CAR,
        icon: <img src={carImage} alt="Car" style={{ width: 100, height: 80 }} />,
        className: 'menu_item'
    },
    {
        label: 'EATING OUT',
        key: ROUTE_CONSTANTS.EATING_OUT,
        icon: <img src={eatingOutImage} alt="Eating Out" style={{ width: 100, height: 80}} />,
        className: 'menu_item'
    },
    {
        label: 'TRAVELING',
        key: ROUTE_CONSTANTS.TRAVELING,
        icon: <img src={travelImage} alt="Traveling" style={{ width: 100, height: 80 }} />,
        className: 'menu_item'
    },
    {
        label: 'OTHEREXPENSES',
        key: ROUTE_CONSTANTS.OTHEREXPENSES,
        icon: <img src={otherImage} alt="Other" style={{ width: 100, height: 80 }} />,
        className: 'menu_item'
    },
    {
        label: 'INCOME',
        key: ROUTE_CONSTANTS.INCOME,
        icon: <img src={incomeImage} alt="Income" style={{ width: 100, height: 80 }} />,
        className: 'menu_item'
    }
];

const CabinetLayout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleNavigate = ({ key }) => {
        navigate(key);
    };

    return (
        <div className="cabinet_layout_main_container">
            <Sider collapsible width={280} style={{ backgroundColor: colorBgContainer }}>
                <Menu
                    mode="inline"
                    items={menuItems}
                    onSelect={handleNavigate}
                    selectedKeys={[pathname]}
                />
            </Sider>

            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 2,
                        minHeight: 300,
                        width: '100%',
                        backgroundColor: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </div>
    );
};

export default CabinetLayout;
