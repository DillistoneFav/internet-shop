import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext } from "react";

import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStoreStore from './store/BasketStore';
import OrdersStore from './store/OrdersStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket: new BasketStoreStore(),
        orders: new OrdersStore(),
    }}>
        <App />
    </Context.Provider>,
  </React.StrictMode>
);