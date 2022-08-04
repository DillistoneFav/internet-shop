import React, { useContext } from "react";
import { Context } from "../../App";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
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
    user._setIsAuth(false);
    navigate(LOGIN_ROUTE);
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
        <Nav className="me-auto">
          <Nav.Link className={classes.links} href="#home">
            Home
          </Nav.Link>
          <Nav.Link className={classes.links} href="#features">
            Features
          </Nav.Link>
          <Nav.Link className={classes.links} href="#pricing">
            Pricing
          </Nav.Link>
        </Nav>

        {user._isAuth ? (
          <Dropdown>
            <Dropdown.Toggle
              className={classes.loggedAs}
              variant="success"
              id="dropdown-basic"
            >
              logged as: {user.email} 123123123123123123
            </Dropdown.Toggle>

            {user.role === "ADMIN" ? (
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>
                  Admin panel
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logout}>log out</Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logout}>log out</Dropdown.Item>
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
