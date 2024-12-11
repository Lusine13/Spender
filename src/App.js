import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-managment/slices/userProfile';
import LoadingWrapper from './components/sheared/LoadingWrapper';
import { ROUTE_CONSTANTS } from './core/utils/constants';

import MainLayout from './components/layouts/Main';
import CabinetLayout from './components/layouts/Cabinet';


import Login from './pages/login';
import Register from './pages/register';
import Cabinet from './pages/cabinet';
import Shopping from './categories/Shopping'; 
import Home from './categories/Home';
import Traveling from './categories/Traveling';
import Car from './categories/Car';
import EatingOut from './categories/EatingOut';
import Education from './categories/Education';
import OtherExpenses from './categories/OtherExpenses';
import Income from './categories/Income';  
import Balance from './categories/Balance';

const App = () => {
    const dispatch = useDispatch();
    const { loading, authUserInfo: { isAuth } } = useSelector(store => store.userProfile);
    
    useEffect(() => {
        dispatch(fetchUserProfileInfo());
    }, [dispatch]);

    return (
        <LoadingWrapper loading={loading}>
            <RouterProvider
                router={createBrowserRouter(
                    createRoutesFromElements(
                        <Route path="/" element={<MainLayout />}>
                            
                            <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login />} />
                            <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />} />

                            {/* Cabinet Layout Route */}
                            <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}>
                                <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />

                                
                                <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
                                <Route path={ROUTE_CONSTANTS.SHOPPING} element={<Shopping />} />
                                <Route path={ROUTE_CONSTANTS.TRAVELING} element={<Traveling />} />
                                <Route path={ROUTE_CONSTANTS.CAR} element={<Car />} />
                                <Route path={ROUTE_CONSTANTS.EATING_OUT} element={<EatingOut />} />
                                <Route path={ROUTE_CONSTANTS.EDUCATION} element={<Education />} />
                                <Route path={ROUTE_CONSTANTS.OTHEREXPENSES} element={<OtherExpenses />} />
                                <Route path={ROUTE_CONSTANTS.INCOME} element={<Income />} /> 
                                <Route path={ROUTE_CONSTANTS.BALANCE} element={<Balance />} />  
                            </Route>
                        </Route>
                    )
                )}
            />
        </LoadingWrapper>
    );
};

export default App;
