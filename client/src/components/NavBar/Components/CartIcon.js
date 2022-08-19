import React from 'react';
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import classes from "../NavBar.module.css";
import { CART_ROUTE } from "../../../utils/constants";

const CartIcon = ({basket, navigate}) => {
    return (
        <div className={classes.margin}>
              <Badge count={basket.Basket.length}>
                <ShoppingCartOutlined className={classes.cartIcon} onClick={() => navigate(CART_ROUTE)} />
              </Badge>
            </div>
    );
};

export default CartIcon;