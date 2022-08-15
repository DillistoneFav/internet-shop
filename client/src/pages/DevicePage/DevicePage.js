import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../index";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import classes from "./DevicePage.module.css";
import { StarOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Rate } from "antd";
import { addDeviceToBasket } from "../../http/basketApi";
import { addRating, checkRating, fetchOneDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react";

const DevicePage = observer(() => {
  const { user, basket } = useContext(Context);
  const [device, setDevice] = useState({ info: [] });
  const [resRate, setResRate] = useState("");
  const [isAccessRating, setAccessRating] = useState(false);
  const [starsCount, setStarsCount] = useState(0);
  const [isDeviceInCart, setIsDeviceInCart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    if (user.isAuth) {
      checkRating({ deviceId: id }).then((res) => setAccessRating(res.allow));
    }
    if (localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
      checkInCart()
    };
  }, [id, resRate, basket]);

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

  const ratingChanged = (rate) => {
    addRating({
      rate,
      deviceId: id,
    }).then((res) => {
      setResRate(res);
    });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            className={classes.imgCont}
            src={process.env.REACT_APP_API_URL + device.img}
            alt="missed image"
          />
        </Col>
        <Col md={4}>
          <Row
            className={`${classes.desc} d-flex flex-column align-items-start`}
          >
            <div className={classes.charTop}>Specifications</div>
            {device.info.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={classes.descRows}
                  style={
                    index % 2
                      ? { backgroundColor: "lightgray" }
                      : { backgroundColor: "white" }
                  }
                >
                  {item.title}: {item.description}
                </div>
              );
            })}
          </Row>
        </Col>
        <Col md={4}>
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
                Device already in your basket!
              </span>
            )}
          </Card>
          <Card
            className={`${classes.cartCard} d-flex flex-column justify-content-between pt-2 pb-3 mt-3`}
          >
            <span className={classes.rateSpan}>Rate this item!</span>
            <Rate
              Count={starsCount}
              onChange={(event) => setStarsCount(event)}
            />
            <Button
              variant="outline-primary"
              className={classes.cartButton}
              onClick={() => console.log(starsCount)}
            >
              Submit!
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default DevicePage;
