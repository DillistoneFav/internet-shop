import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import CartItem from "./CartItem";

const DevicesList = ({ basket }) => {
  return (
    <Row className="mt-3">
      <Col xs={12}>
        {basket.Basket.map((device) => (
          <CartItem key={device.id} device={device} />
        ))}
      </Col>
    </Row>
  );
};

export default DevicesList;
