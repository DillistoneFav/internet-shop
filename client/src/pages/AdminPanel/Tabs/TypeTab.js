import React from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css"
import { Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const TypeTab = ({data, setTypeVisible}) => {

  const typeColumns = [
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
            columns={typeColumns}
            dataSource={data}
            className="mt-3"
            size="small"
          />
          <Button
            variant="outline-primary"
            className={`mt-3 p-2 ${classes.modalButton}`}
            onClick={() => setTypeVisible(true)}
          >
            Add new Type
          </Button>
        </div>
    );
};

export default TypeTab;