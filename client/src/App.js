import './App.css';
import {BrowserRouter as Router,} from "react-router-dom";
import { createContext } from 'react';

import AppRouter from './components/Router';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import NavBar from './components/NavBar/NavBar';

export const Context = createContext(null)

function App() {
  return (
    <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}>
      <Router>
      <div className="App">
        <NavBar/>
        <AppRouter/>
      </div>
    </Router>
    </Context.Provider>
    
  );
}

export default App;
