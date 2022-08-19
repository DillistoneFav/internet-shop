import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../index";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";

import { addDeviceToBasket } from "../../http/basketApi";
import { fetchOneDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react";
import DesctiptionColumn from "./Components/DesctiptionColumn";
import ImageColumn from "./Components/ImageColumn";
import PriceAndRatingColumn from "./Components/PriceAndRatingColumn";

const DevicePage = observer(() => {
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const [isDeviceInCart, setIsDeviceInCart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    if (
      user.isAuth &&
      localStorage.getItem("cart") &&
      localStorage.getItem("cart").length > 0 
    ) {
      checkInCart();
    }
  }, [id, basket]);

  const checkInCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const isDeviceInCart = cart.findIndex(
      (item) => Number(item.id) === Number(id)
    );
    return isDeviceInCart < 0
      ? setIsDeviceInCart(false)
      : setIsDeviceInCart(true);
  };

  const addDeviceInBasket = (device) => {
    if (user.isAuth) {
      setIsDeviceInCart(true);
      addDeviceToBasket(device).then(() => basket.addItem(device));
    } else {
      alert("Please log in or register first!");
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <ImageColumn device={device}/>
        <DesctiptionColumn device={device}/>
        <PriceAndRatingColumn user={user} device={device} id={id} addDeviceInBasket={addDeviceInBasket} isDeviceInCart={isDeviceInCart}/>
      </Row>
    </Container>
  );
});

export default DevicePage;
