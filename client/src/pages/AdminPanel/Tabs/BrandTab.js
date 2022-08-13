import React from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css"
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const BrandTab = ({data, setBrandVisible}) => {
  const brandColumns = [
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
      title: "Actions",
      render: (text, record) => (
          <DeleteOutlined
            pointer="true"
            onClick={() => console.log(record.id)}
          />
      ),
    },
  ];

    return (
        <div>
          <Table
            columns={brandColumns}
            dataSource={data}
            className="mt-3"
            size="small"
          />
          <Button
            variant="outline-primary"
            className={`mt-3 p-2 ${classes.modalButton}`}
            onClick={() => setBrandVisible(true)}
          >
            Add new Brand
          </Button>
        </div>
    );
};

export default BrandTab;