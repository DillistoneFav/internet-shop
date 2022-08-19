import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CreateBrand from "../modals/CreateBrand";
import Loader from "../../../components/Loader/Loader";
import { deleteBrand, fetchBrands } from "../../../http/deviceAPI";

const BrandTab = ({ data, device }) => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
  }, [loading]);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteBrand(id).then((data) => {
      setTimeout(() => setLoading(false), 1000);
    });
  };

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
    <Loader />
  );
};

export default BrandTab;
