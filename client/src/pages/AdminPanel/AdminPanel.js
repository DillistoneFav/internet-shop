import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import CreateBrand from "./modals/CreateBrand";
import CreateDevice from "./modals/CreateDevice";
import CreateType from "./modals/CreateType";
import { Tabs } from "antd";
import "antd/dist/antd.css";

import { Context } from "../../index";
import { fetchTypes, fetchBrands, fetchDevices } from "../../http/deviceAPI";
import Loader from "../../components/Loader/Loader";
import { observer } from "mobx-react";
import TypeTab from "./Tabs/TypeTab";
import BrandTab from "./Tabs/BrandTab";
import DeviceTab from "./Tabs/DeviceTab";

const AdminPanel = observer(() => {
  const { device } = useContext(Context);
  const { TabPane } = Tabs;

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, null, null).then((data) => {
      device.setDevices(data.rows);
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    !loading ?
    <Container className="d-flex flex-column">
      <Tabs type="card" size="large" className="mt-3">
        <TabPane tab="Types" key="1">
          <TypeTab data={device.types} setTypeVisible={setTypeVisible}/>
        </TabPane>
        <TabPane tab="Brands" key="2">
          <BrandTab data={device.brands} setBrandVisible={setBrandVisible}/>
        </TabPane>
        <TabPane tab="Devices" key="3">
          <DeviceTab data={device.devices} types={device.types} brands={device.brands} setDeviceVisible={setDeviceVisible}/>
        </TabPane>
        <TabPane tab="Orders" key="4">
          orders
        </TabPane>
      </Tabs>

      <CreateBrand
        show={brandVisible}
        onHide={() => setBrandVisible(false)}
        setLoading={setLoading}
      />
      <CreateType
        show={typeVisible}
        onHide={() => setTypeVisible(false)}
        setLoading={setLoading}
      />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
        setLoading={setLoading}
      />
    </Container>
    : <Loader/>
  );
});

export default AdminPanel;
