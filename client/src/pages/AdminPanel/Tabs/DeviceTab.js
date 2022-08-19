import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css";
import { Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateDevice from "../modals/CreateDevice";
import Loader from "../../../components/Loader/Loader";
import { deleteDevice } from "../../../http/deviceAPI";

const DeviceTab = ({ data, types, brands }) => {
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteDevice(id).then((data) => {
      setTimeout(() => setLoading(false), 1000);
    });
  };

  const findName = (id, itemsArray) => {
    const findedItem = itemsArray.find((item) => item.id === id);
    return findedItem.name;
  };

  const deviceColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "id",
    },
    {
      title: "Type",
      dataIndex: "typeId",
      key: "id",
      render: (record) => {
        return findName(record, types);
      },
    },
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "id",
      render: (record) => {
        return findName(record, brands);
      },
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className={classes.Actions}>
          <EditOutlined pointer="true" onClick={() => console.log(record.id)} />
          <Popconfirm
            title="Sure want to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined pointer="true" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return !loading ? (
    <div>
      <Table
        columns={deviceColumns}
        dataSource={data}
        className="mt-3"
        size="small"
      />
      <Button
        variant="outline-primary"
        className={`mt-3 p-2 ${classes.modalButton}`}
        onClick={() => {
          setDeviceVisible(true);
        }}
      >
        Add mew Device
      </Button>
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
        setLoading={setLoading}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default DeviceTab;
