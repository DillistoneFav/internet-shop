import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import {Spinner} from "react-bootstrap";

import AppRouter from "./components/Router";
import NavBar from "./components/NavBar/NavBar";
import { check } from "./http/userApi";
import {Context} from "./index";

const App = () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('token')) {
        setLoading(true);
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => {
            setLoading(false);
        })
    }
}, [user]);

  if (loading) {
      return <Spinner animation={"grow"}/>
  }

  return (
      <Router>
        <div className="App">
          <NavBar />
          <AppRouter />
        </div>
      </Router>
  );
};

export default App;
