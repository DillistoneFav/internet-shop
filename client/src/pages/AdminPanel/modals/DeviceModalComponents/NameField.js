import React from "react";
import Form from "react-bootstrap/Form";

const NameField = ({ newDevice, setNewDevice }) => {
  return (
    <Form.Control
      placeholder="Enter device name"
      value={newDevice.name}
      onChange={(event) =>
        setNewDevice({ ...newDevice, name: event.target.value })
      }
    />
  );
};

export default NameField;
