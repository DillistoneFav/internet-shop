import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/esm/Image";
import { Context } from "../../../index";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import {useNavigate} from "react-router-dom"

const CartItem = ({ device }) => {
  const { basket } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Card key={device.id} style={{ width: "100%" }} className="mb-3">
      <Card.Body>
        <Row>
          <Col className="d-flex align-items-center justify-content-center" xs={3}>
            <Image
              src={process.env.REACT_APP_API_URL + device.img}
              style={{ width: "100%", maxWidth: 250 }}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-between" xs={6}>
            <Row>
              <Col xs={12} style={{ fontSize: "24px" }}>
                <b>Name:</b>{" "}
                <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => navigate(`/internet-shop/device/${device.id}`)}>
                  {device.name}
                </span>
              </Col>
            </Row>
            <br />
            <br />
            <Row style={{ border: "1px solid gray", borderRadius: "10px" }}>
              <Col xs={12} style={{ fontSize: "20px" }}>
                <div style={{borderBottom: "1px solid gray", width: "100%", fontWeight: "bold"}}>Description</div>
                {device.info && device.info.length !== 0
                  ? device.info.map((info, i) => {
                      if (i % 2 === 0) {
                        return (
                          <Row key={info.id}>
                            <Col className="d-flex align-items-center justify-content-center" xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row
                            key={info.id}
                            style={{ backgroundColor: "lightgray" }}
                          >
                            <Col className="d-flex align-items-center justify-content-center" xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      }
                    })
                  : "There are no desciption for this item!"}
              </Col>
            </Row>
          </Col>
          <Col className="d-flex flex-column justify-content-center" xs={3}>
            <Row>
              <Col
                xs={12}
                className="d-flex flex-column align-items-center"
                style={{ fontSize: "32px" }}
              >
                Price: {device.price} RUB
                <Button
                  style={{ width: "80%" }}
                  variant="outline-primary"
                  onClick={() => basket.setDeleteItemBasket(device)}
                  className="mt-3"
                >
                  Delete from Cart
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
