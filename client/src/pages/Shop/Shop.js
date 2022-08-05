import React, { useContext, useEffect } from "react";
import { Context } from "../../index";
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import TypeBar from '../../components/TypeBar/TypeBar';
import BrandBar from '../../components/BrandBar/BrandBar';
import DeviceList from '../../components/DeviceList/DeviceList';
import { observer } from 'mobx-react';
import { fetchTypes, fetchBrands, fetchDevices } from "../../http/deviceAPI";

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices().then(data => device.setDevices(data.rows));
    }, [device])

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
});

export default Shop;