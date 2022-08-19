import React, {useState} from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "../AdminPanel.module.css";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CreateType from "../modals/CreateType";
import Loader from "../../../components/Loader/Loader";

const TypeTab = ({ data }) => {

  const [typeVisible, setTypeVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <DeleteOutlined
            pointer="true"
            onClick={() => console.log(record.id)}
          />
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
