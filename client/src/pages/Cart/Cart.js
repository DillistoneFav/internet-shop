import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";

import { Modal, Input } from 'antd';
import {Context} from "../../index";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import CartItem from './CartItem/CartItem';
import classes from './Cart.module.css'

import {useNavigate} from "react-router-dom";
import { SHOP_ROUTE } from '../../utils/constants';
import { sendOrder } from '../../http/ordersApi';

const Cart = observer(() => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [phoneNubmer, setPhoneNubmer] = useState(0);
    const navigate = useNavigate();
    const {basket} = useContext(Context);

    useEffect(() => {
        const price = JSON.parse(localStorage.getItem('cart')).reduce((accumulator, currentValue) => {
            return accumulator + currentValue.price;
        }, 0)
        basket.setTotalPrice(price)
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = async () => {
        phoneNubmer.length === 11 ?
        await sendOrder({mobile: phoneNubmer, basket: basket.Basket}).then(data => {
            basket.Basket.forEach(item => basket.setDeleteItemBasket(item))
            setIsModalVisible(false);
            navigate(SHOP_ROUTE)
        })
        : alert("enter the correct phone number!")
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    if(basket.Basket.length === 0) {
        return (
            <Container className="d-flex flex-column align-items-center mt-5">
                <div className="text-center mt-5" style={{fontSize: 28}}><b>Empty shopping basket</b></div>
                <Button className={`${classes.backButton} mt-2`} onClick={() => navigate(SHOP_ROUTE)}>Go to shop!</Button>
            </Container>
        )
    }

    return (
        <Container>
        <Card style={{ width: "100%" }} className="mt-3 d-flex align-items-center">
            <span style={{fontSize: "20px"}} >Your total order price is: {basket.Price}</span>
            <Button className="mt-3 mb-2" style={{width: "25%"}} onClick={showModal}>Make order!</Button>
        </Card>
            <Row className="mt-3">
                <Col xs={12}>
                    {basket.Basket.map(device => <CartItem key={device.id} device={device}/>)}
                </Col>
            </Row>
            <Modal title="Your order" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="d-flex flex-column">{basket.Basket.map(item => <span key={item.id}>{item.name}</span>)}</div>
            <div className="mt-3">Please enter your phone:</div>
            <Input value={phoneNubmer} onChange={(event) => setPhoneNubmer(event.target.value)} type="number"placeholder="89114567899" />
      </Modal>
        </Container>
    );
});

export default Cart;