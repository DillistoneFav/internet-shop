import React, { useContext, useState, useEffect } from "react";
import { Table, Select, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteOrder, fetchChangeStatusOrder } from "../../../http/ordersApi";
import { Context } from "../../../index";
import Loader from "../../../components/Loader/Loader";
import { fetchOrders } from "../../../http/ordersApi";

const { Option } = Select;

const OrdersTab = () => {
  const { orders } = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders().then((data) => {
      orders.setOrders(data.rows);
    });
  }, [loading]);

  const handleDelete = async (orderId) => {
    setLoading(true);
    await deleteOrder({ id: orderId }).then((data) => {
      setTimeout(() => setLoading(false), 1000);
    });
  };

  const handleChange = (status, record) => {
    const changedStatus = status === "Completed" ? true : false;
    fetchChangeStatusOrder({ complete: changedStatus, id: record.id }).then(
      () => {
        const changedOrderIndex = orders.orders.findIndex(
          (item) => item.id === record.id
        );
        orders.orders[changedOrderIndex].complete = changedStatus;
      }
    );
  };

  const typeColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
        <Popconfirm
          title="Sure want to delete?"
          onConfirm={() => handleDelete(record.id)}
        >
          <DeleteOutlined pointer="true" />
        </Popconfirm>
      ),
    },
  ];

  return !loading ? (
    <div>
      <Table
        columns={typeColumns}
        dataSource={orders.orders}
        className="mt-3"
        size="small"
      />
    </div>
  ) : (
    <Loader />
  );
};

export default OrdersTab;
