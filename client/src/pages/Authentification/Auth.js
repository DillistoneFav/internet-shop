import React, { useState, useContext } from "react";
import { Context } from "../../index";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import classes from "./Auth.module.css";
import Button from "react-bootstrap/esm/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../../utils/constants";
import { registration, login } from "../../http/userApi";
import { observer } from "mobx-react";

const Auth = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const authHandler = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(authData.email, authData.password);
      } else {
        data = await registration(authData.email, authData.password);
      }
    user.setUser(data);
    user.setIsAuth(true);
    navigate(SHOP_ROUTE);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container
      className={`${classes.Cont} d-flex justify-content-center align-items-center`}
      style={{ height: window.innerHeight - 70 }}
    >
      <Card className={classes.border}>
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="login"
            value={authData.email}
            onChange={(event) => {
              setAuthData({
                ...authData,
                email: event.target.value,
              });
            }}
          ></Form.Control>
          <Form.Control
            className="mt-3"
            placeholder="password"
            type="password"
            value={authData.password}
            onChange={(event) => {
              setAuthData({
                ...authData,
                password: event.target.value,
              });
            }}
          ></Form.Control>
          <Button className="mt-3" variant={"primary"} onClick={authHandler}>
            {isLogin ? "Log in" : "Registration"}
          </Button>
          {isLogin ? (
            <div className={classes.regZone}>
              Have not an account yet?
              <NavLink className={classes.regLink} to={REGISTRATION_ROUTE}>
                Registration
              </NavLink>
            </div>
          ) : (
            <div className={classes.regZone}>
              Already have an account?
              <NavLink className={classes.regLink} to={LOGIN_ROUTE}>
                Log in
              </NavLink>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
