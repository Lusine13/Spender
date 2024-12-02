import Login from './login';
import Register from './register';
import { useEffect } from 'react';
import LoadingWrapper from './components/sheared/LoadingWrapper';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from './constants'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-managment/slices/userProfile';


const App = () => {       
    const dispatch = useDispatch();
    const { loading, authUserInfo: { isAuth} } = useSelector(store => store.userProfile);
    
    useEffect( () => {
        dispatch(fetchUserProfileInfo());
    }, []);

   
    return (        
        <LoadingWrapper loading={loading}>
        <RouterProvider
         router={
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<Register />}>
                      <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login />}/>                   

                      <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />}/>
                      
                     
                    </Route>
                )
            )
         }
         />
         </LoadingWrapper>             
    )
};

export default App;