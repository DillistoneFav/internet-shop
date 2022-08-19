import React from 'react';
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import classes from "../DevicePage.module.css";

const ImageColumn = ({device}) => {
    return (
        <Col md={4}>
          <Image
            className={classes.imgCont}
            src={process.env.REACT_APP_API_URL + device.img}
            alt="missed image"
          />
        </Col>
    );
};

export default ImageColumn;