import React from "react";
import { SHOP_ROUTE } from "../../../utils/constants";
import classes from "../NavBar.module.css";

const Logo = ({ navigate }) => {
  return (
    <div
      className={`${classes.logoLink} ${classes.coollink}`}
      onClick={() => navigate(SHOP_ROUTE)}
    >
      Experimental Store
    </div>
  );
};

export default Logo;
