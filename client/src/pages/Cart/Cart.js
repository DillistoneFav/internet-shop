import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react";


import {Context} from "../../index";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import CartItem from './CartItem/CartItem';
import classes from './Cart.module.css'

import {useNavigate} from "react-router-dom";
import { SHOP_ROUTE } from '../../utils/constants';

const Cart = observer(() => {
    const navigate = useNavigate();
    const {basket} = useContext(Context);

    if(basket.Basket.length === 0) {
        return (
            <Container className="d-flex flex-column align-items-center mt-5">
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Empty shopping basket</b></div>
                <Button className={`${classes.backButton} mt-3`} onClick={() => navigate(SHOP_ROUTE)}>Go to shop!</Button>
            </Container>
        )
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col xs={12}>
                    {basket.Basket.map(device => <CartItem key={device.id} device={device}/>)}
                </Col>
            </Row>
        </Container>
    );
});

export default Cart;