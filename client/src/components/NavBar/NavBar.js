import React, { useContext, useEffect } from "react";
import { Context } from "../../index";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { fetchBasket } from "../../http/basketApi";

import classes from "./NavBar.module.css";
import {
  SHOP_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  CART_ROUTE,
} from "../../utils/constants";

const NavBar = observer(() => {
  const { user, basket } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    basket.setBasket([]);
    navigate(LOGIN_ROUTE);
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  };

  return (
    <Navbar bg="dark" variant="dark" className={classes.navCustom}>
      <Container>
        <NavLink
          className={`${classes.logoLink} ${classes.coollink}`}
          to={SHOP_ROUTE}
        >
          Experimental Store
        </NavLink>

        {user._isAuth ? (
          <div className="d-flex align-items-center">
            <div className={classes.margin}>
              <Badge count={basket.Basket.length}>
                <ShoppingCartOutlined className={classes.cartIcon} onClick={() => navigate(CART_ROUTE)} />
              </Badge>
            </div>

            <Dropdown className="ml-3">
              <Dropdown.Toggle
                className={classes.loggedAs}
                variant="success"
                id="dropdown-basic"
              >
                Logged as:{" "}
                <span className={classes.loggedName}>{user.user.email}</span>
              </Dropdown.Toggle>

              {user.user.role === "ADMIN" ? (
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>
                    Admin panel
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>log out</Dropdown.Item>
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>log out</Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
          </div>
        ) : (
          <Button
            className={classes.loginButton}
            variant="outline-secondary"
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            log in
          </Button>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
