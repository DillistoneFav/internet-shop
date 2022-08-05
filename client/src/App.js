import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react";
import {Spinner} from "react-bootstrap";

import AppRouter from "./components/Router";
import NavBar from "./components/NavBar/NavBar";
import { check } from "./http/userApi";
import {Context} from "./index";

const App = () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [user.isAuth])

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
