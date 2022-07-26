import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import { Context } from "../../index";
import { observer } from "mobx-react";
import TypeTab from "./Tabs/TypeTab";
import BrandTab from "./Tabs/BrandTab";
import DeviceTab from "./Tabs/DeviceTab";
import OrdersTab from "./Tabs/OrdersTab";
import { fetchTypes, fetchBrands, fetchDevices } from "../../http/deviceAPI";
import { fetchOrders } from "../../http/ordersApi";

const AdminPanel = observer(() => {
  const { device, orders } = useContext(Context);
  const { TabPane } = Tabs;

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, null, 999).then((data) => {
      device.setDevices(data.rows);
    });
    fetchOrders().then((data) => {
      orders.setOrders(data.rows);
    });
  }, []);

  return (
    <Container className="d-flex flex-column">
      <Tabs type="card" size="large" className="mt-3">
        <TabPane tab="Types" key="1">
          <TypeTab data={device.types} device={device}/>
        </TabPane>
        <TabPane tab="Brands" key="2">
          <BrandTab data={device.brands} device={device}/>
        </TabPane>
        <TabPane tab="Devices" key="3">
          <DeviceTab
            device={device}
            data={device.devices}
            types={device.types}
            brands={device.brands}
          />
        </TabPane>
        <TabPane tab="Orders" key="4">
          <OrdersTab data={orders.orders} />
        </TabPane>
      </Tabs>
    </Container>
  );
});

export default AdminPanel;
