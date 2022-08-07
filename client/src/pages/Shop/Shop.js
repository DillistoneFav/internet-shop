import React, { useContext, useEffect } from "react";
import { Context } from "../../index";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import TypeBar from "../../components/TypeBar/TypeBar";
import BrandBar from "../../components/BrandBar/BrandBar";
import DeviceList from "../../components/DeviceList/DeviceList";
import PaginationComp from "../../components/Pagination/PaginationComp";
import { observer } from "mobx-react";
import { fetchTypes, fetchBrands, fetchDevices } from "../../http/deviceAPI";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 8).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    if (device.selectedType.length) {
      fetchDevices(null, device.selectedBrand.id, device.page, 8).then(
        (data) => {
          device.setDevices(data.rows);
          device.setTotalCount(data.count);
        }
      );
    } else {
      fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        8
      ).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    }
  }, [device.page, device.selectedType, device.selectedBrand]);

  const getAllDevices = () => {
    device.setSelectedType({});
    device.setSelectedBrand({});
}

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          <TypeBar />
          <BrandBar />
          <Button
            style={{ width: "100%" }}
            className="mt-3"
            onClick={getAllDevices}
          >
            Clear
          </Button>
        </Col>
        <Col md={9}>
          <DeviceList />
          <PaginationComp />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
