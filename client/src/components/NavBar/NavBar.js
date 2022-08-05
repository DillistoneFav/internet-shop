import React, { useContext } from "react";
import { Context } from "../../index";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

import classes from "./NavBar.module.css";
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../../utils/constants";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
    localStorage.removeItem('token');
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
          <Dropdown>
            <Dropdown.Toggle
              className={classes.loggedAs}
              variant="success"
              id="dropdown-basic"
            >
              Logged as: <span className={classes.loggedName}>{user.user.email}</span>
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
