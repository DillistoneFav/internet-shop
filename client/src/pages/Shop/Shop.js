import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import TypeBar from '../../components/TypeBar/TypeBar';
import BrandBar from '../../components/BrandBar/BrandBar';
import DeviceList from '../../components/DeviceList/DeviceList';

const Shop = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col md={3}>
                    <TypeBar/>
                    <BrandBar/>
                </Col>
                <Col md={9}>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;