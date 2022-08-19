import React from 'react';
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

const CartInfo = ({basket, setIsModalVisible}) => {
    const showModal = () => {
        setIsModalVisible(true);
      };

    return (
        <Card style={{ width: "100%" }} className="mt-3 d-flex align-items-center">
            <span style={{fontSize: "20px"}} >Your total order price is: {basket.Price}</span>
        <Button className="mt-3 mb-2" style={{width: "25%"}} onClick={showModal}>Make order!</Button>
    </Card>
    );
};

export default CartInfo;