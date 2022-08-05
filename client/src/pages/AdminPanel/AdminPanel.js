import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import CreateBrand from "./modals/CreateBrand";
import CreateDevice from "./modals/CreateDevice";
import CreateType from "./modals/CreateType";

import { Context } from "../../index";
import { fetchTypes, fetchBrands } from "../../http/deviceAPI";

const AdminPanel = () => {
  const { device } = useContext(Context);
  
  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
  }, [device.types, device.brands])
    
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-primary" className="mt-3 p-2" onClick={() => setTypeVisible(true)}>
        Add new Type
      </Button>
      <Button variant="outline-primary" className="mt-3 p-2" onClick={() => setBrandVisible(true)}>
        Add new Brand
      </Button>
      <Button variant="outline-primary" className="mt-3 p-2" onClick={() => {
        setDeviceVisible(true)
        }}>
        Add mew Device
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
    </Container>
  );
};

export default AdminPanel;
