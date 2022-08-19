import React from 'react';
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import classes from "../Cart.module.css";
import { SHOP_ROUTE } from "../../../utils/constants";

const EmptyBasket = ({navigate}) => {
    return (
        <Container className="d-flex flex-column align-items-center mt-5">
        <div className="text-center mt-5" style={{ fontSize: 28 }}>
          <b>Empty shopping basket</b>
        </div>
        <Button
          className={`${classes.backButton} mt-2`}
          onClick={() => navigate(SHOP_ROUTE)}
        >
          Go to shop!
        </Button>
      </Container>
    );
};

export default EmptyBasket;