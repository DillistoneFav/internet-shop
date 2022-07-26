import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css";
import { Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateDevice from "../modals/CreateDevice";
import Loader from "../../../components/Loader/Loader";
import { deleteDevice, fetchDevices } from "../../../http/deviceAPI";

const DeviceTab = ({ device, data, types, brands}) => {
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingState, setEditingState] = useState({
    isEditing: false,
    id: undefined,
  });

  useEffect(() => {
    fetchDevices(null, null, null, 999).then((data) => {
      device.setDevices(data.rows);
    });
  }, [loading]);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteDevice(id).then((data) => {
      setTimeout(() => setLoading(false), 1000);
    });
  };

  const handleEdit = (id) => {
    setEditingState({
      isEditing: true,
      id: id,
    });
    setDeviceVisible(true);
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
          <EditOutlined pointer="true" onClick={() => handleEdit(record.id)} />
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
        editingState={editingState}
        setEditingState={setEditingState}
        show={deviceVisible}
        onHide={() => {
          setEditingState({
            isEditing: false,
            id: undefined,
          });
          setDeviceVisible(false);
        }}
        setLoading={setLoading}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default DeviceTab;
