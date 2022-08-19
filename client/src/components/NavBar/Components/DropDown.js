import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import classes from "../NavBar.module.css";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../../../utils/constants";

const DropDown = ({user, navigate, basket}) => {
  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    basket.setBasket([]);
    navigate(LOGIN_ROUTE);
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  };

    return (
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
    );
};

export default DropDown;