import React from 'react';
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/Button";
import classes from "../../DevicePage.module.css";
import { StarOutlined } from "@ant-design/icons";

const PriceAndCartCard = ({device, addDeviceInBasket, isDeviceInCart}) => {
    return (
        <Card
            className={`${classes.cartCard} d-flex flex-column justify-content-between pt-2 pb-3`}
          >
            <div className="d-flex flex-column">
              <span className={classes.discount}>Discount: 5%!</span>
              <span className={classes.oldPrice}>{device.price}₽</span>
              <span className={classes.newPrice}>
                {Math.floor(device.price * 0.95)}₽
              </span>
              <span
                className={`${classes.rating} d-flex align-items-center justify-content-center`}
              >
                Rating: {device.rating}
                <StarOutlined />
              </span>
            </div>
            {!isDeviceInCart ? (
              <Button
                variant="outline-primary"
                className={classes.cartButton}
                onClick={() => {
                  addDeviceInBasket(device);
                }}
              >
                Add to cart!
              </Button>
            ) : (
              <span style={{ fontSize: "24px" }}>
                Device already in your cart!
              </span>
            )}
          </Card>
    );
};

export default PriceAndCartCard;