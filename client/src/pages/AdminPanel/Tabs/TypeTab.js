import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css";
import { Table, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CreateType from "../modals/CreateType";
import Loader from "../../../components/Loader/Loader";
import { deleteType, fetchTypes } from "../../../http/deviceAPI";

const TypeTab = ({ data, device }) => {

  const [typeVisible, setTypeVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, [loading]);

  const handleDelete = async (id) => {
    setLoading(true)
    await deleteType(id).then((data) => {
      setTimeout(() => setLoading(false), 1000);
    })
  }

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
        <Popconfirm title="Sure want to delete?" onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined
            pointer="true"
          />
        </Popconfirm>
      ),
    },
  ];

  return !loading ? ( 
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
      <CreateType
        show={typeVisible}
        onHide={() => setTypeVisible(false)}
        setLoading={setLoading}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default TypeTab;
