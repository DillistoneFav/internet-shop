import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/esm/Image";
import { Context } from "../../../index";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

const CartItem = ({ device }) => {
  const { basket, user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Card key={device.id} style={{ width: "100%" }} className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={4}>
            <Image
              src={process.env.REACT_APP_API_URL + device.img}
              style={{ width: "100%", maxWidth: 250 }}
            />
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <b>Title:</b>{" "}
                <span onClick={() => navigate(`/device/${device.id}`)}>
                  {device.name}
                </span>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={12}>
                <b>Description:</b>
                <br />
                <br />
                {device.info && device.info.length !== 0
                  ? device.info.map((info, i) => {
                      if (i % 2 === 0) {
                        return (
                          <Row key={info.id}>
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row
                            key={info.id}
                            style={{ backgroundColor: "lightgray" }}
                          >
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      }
                    })
                  : "There are no desciption for this item!"}
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <Row className="mt-5">
              <Col xs={12} className="d-flex justify-content-center">
                Price: {device.price} RUB
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="d-flex justify-content-between flex-column">
                {user.isAuth ? (
                  <Button
                    variant="outline-dark"
                    onClick={() => basket.setDeleteItemBasket(device, true)}
                  >
                    Delete from Cart
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    onClick={() => basket.setDeleteItemBasket(device)}
                  >
                    Delete from Cart
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
