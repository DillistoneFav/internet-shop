import React from 'react';
import Col from "react-bootstrap/esm/Col";
import PriceAndCartCard from './PriceAndRatingColumnItems/PriceAndCartCard';
import RatingCard from './PriceAndRatingColumnItems/RatingCard';

const PriceAndRatingColumn = ({user, device, id, addDeviceInBasket, isDeviceInCart}) => {
    return (
        <Col md={4}>
        <PriceAndCartCard device={device} addDeviceInBasket={addDeviceInBasket} isDeviceInCart={isDeviceInCart}/>
        <RatingCard user={user} id={id}/>
      </Col>
    );
};

export default PriceAndRatingColumn;