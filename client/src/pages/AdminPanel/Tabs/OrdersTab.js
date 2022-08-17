import React, { useEffect, useContext, useState} from "react";
import { Table, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { fetchChangeStatusOrder } from "../../../http/ordersApi";
import { Context } from "../../../index";
import { fetchOrders } from "../../../http/ordersApi";
const { Option } = Select;

const OrdersTab = ({ data, setLoading }) => {
    const { orders } = useContext(Context)

    useEffect(() => {
        fetchOrders().then((data) => {
            orders.setOrders(data.rows)
          });
    }, [orders])

  const handleChange = (status, record) => {
    const changedStatus = status === "Completed" ? true : false
    setLoading(true);
    fetchChangeStatusOrder({complete: changedStatus, id: record.id}).then(() => {
        const changedOrderIndex = orders.orders.findIndex(item => item.id === record.id)
        orders.orders[changedOrderIndex].complete = changedStatus
        setTimeout(() => setLoading(false), 1000);
    })
  };

  const typeColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Status",
      dataIndex: "complete",
      key: "ID",
      render: (bool, record) => (
        <Select
          defaultValue={bool ? "Completed" : "In progress"}
          style={{
            width: 120,
          }}
          onChange={(info) => handleChange(info, record)}
        >
          <Option value="In progress">In progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      ),
    },
    {
      title: "Phone",
      dataIndex: "mobile",
    },
    {
      title: "User",
      dataIndex: "userId",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <DeleteOutlined pointer="true" onClick={() => console.log(record.id)} />
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={typeColumns}
        dataSource={orders.orders}
        className="mt-3"
        size="small"
      />
    </div>
  );
};

export default OrdersTab;
