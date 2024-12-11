import { Outlet } from 'react-router-dom';
import Header from '../../global/Header';
import './index.css';

const MainLayout = () => {
    return (
        <div className="main_layaut_container">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
    )
};

export default MainLayout;