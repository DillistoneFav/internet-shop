import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import CreateBrand from "./modals/CreateBrand";
import CreateDevice from "./modals/CreateDevice";
import CreateType from "./modals/CreateType";

const AdminPanel = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button variant="outline-primary" className="mt-3 p-2" onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button>
      <Button variant="outline-primary" className="mt-3 p-2" onClick={() => setBrandVisible(true)}>
        Добавить бренд
      </Button>
      <Button variant="outline-primary" className="mt-3 p-2" onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
    </Container>
  );
};

export default AdminPanel;
