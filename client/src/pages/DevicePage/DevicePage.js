import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/Button";
import classes from "./DevicePage.module.css";
import { StarOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../../http/deviceAPI";

const DevicePage = () => {
  const {id} = useParams()
  const [device, setDevice] = useState({info: []});

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data));
  }, [])

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <img className={classes.imgCont} src={process.env.REACT_APP_API_URL + device.img} alt="missed image"/>
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
              <span className={classes.newPrice}>{Math.floor(device.price * 0.95)}₽</span>
              <span
                className={`${classes.rating} d-flex align-items-center justify-content-center`}
              >
                Rating: {device.rating}
                <StarOutlined />
              </span>
            </div>
            <Button variant="outline-primary" className={classes.cartButton}>
              Add to cart!
            </Button>{" "}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DevicePage;
