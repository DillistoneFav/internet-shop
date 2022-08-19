import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { Context } from "../../index";
import Container from "react-bootstrap/esm/Container";

import { useNavigate } from "react-router-dom";
import CartInfo from "./Components/CartInfo";
import OrderModal from "./Components/OrderModal";
import EmptyBasket from "./Components/EmptyBasket";
import DevicesList from "./Components/DevicesList";

const Cart = observer(() => {
  const { basket } = useContext(Context);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    basket.getPrice();
  }, []);

  return basket.Basket.length === 0 ? (
    <EmptyBasket navigate={navigate} />
  ) : (
    <Container>
      <CartInfo basket={basket} setIsModalVisible={setIsModalVisible} />
      <DevicesList basket={basket} />
      <OrderModal
        basket={basket}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        navigate={navigate}
      />
    </Container>
  );
});

export default Cart;
