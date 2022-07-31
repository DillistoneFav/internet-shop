import React, { useContext } from 'react';
import {
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import { Context } from '../App';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <div>
            <Routes>
                {user.isAuth ? authRoutes.map(item => 
                    <Route path={item.path} element={<item.Component/>} exact key={item.path}></Route>
                )
                :
                publicRoutes.map(item => 
                    <Route path={item.path} element={<item.Component/>} exact key={item.path}></Route>
                )}
                <Route path="*" element={<Navigate to="/internet-shop/error" replace />}></Route>
          </Routes>
        </div>
    );
};

export default AppRouter;