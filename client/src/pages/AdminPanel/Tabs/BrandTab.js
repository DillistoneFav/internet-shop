import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CreateBrand from "../modals/CreateBrand";
import Loader from "../../../components/Loader/Loader";

const BrandTab = ({ data }) => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <DeleteOutlined pointer="true" onClick={() => console.log(record.id)} />
      ),
    },
  ];

  return !loading ? (
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
      <CreateBrand
        show={brandVisible}
        onHide={() => setBrandVisible(false)}
        setLoading={setLoading}
      />
    </div>
  ) : (
    <Loader/>
  );
};

export default BrandTab;
