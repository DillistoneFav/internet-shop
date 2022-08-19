import React, { useContext } from "react";
import { Context } from "../../index";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";


import classes from "./NavBar.module.css";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
} from "../../utils/constants";
import Logo from "./Components/Logo";
import CartIcon from "./Components/CartIcon";
import DropDown from "./Components/DropDown";

const NavBar = observer(() => {
  const { user, basket } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" className={classes.navCustom}>
      <Container>
        <Logo navigate={navigate}/>

        {user._isAuth ? (
          <div className="d-flex align-items-center">
            <CartIcon basket={basket} navigate={navigate}/>
            <DropDown user={user} navigate={navigate} basket={basket}/>
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
