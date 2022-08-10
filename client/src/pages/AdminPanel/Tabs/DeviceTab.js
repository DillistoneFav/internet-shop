import React from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css"
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const DeviceTab = ({setDeviceVisible, data, types, brands}) => {

  const findName = (id, itemsArray) => {
    const findedItem = itemsArray.find(item => item.id === id);
    return findedItem.name;
  }

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
        return findName(record, types)
      }
    },
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "id",
      render: (record) => {
        return findName(record, brands)
      }
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className={classes.Actions}>
          <EditOutlined pointer="true" onClick={() => console.log(record.id)} />
          <DeleteOutlined
            pointer="true"
            onClick={() => console.log(record.id)}
          />
        </div>
      ),
    },
  ];

    return (
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
        </div>
    );
};

export default DeviceTab;