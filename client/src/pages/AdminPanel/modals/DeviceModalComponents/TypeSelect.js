import React from "react";
import Form from "react-bootstrap/Form";

const TypeSelect = ({ device, newDevice, setNewDevice }) => {
  return (
    <Form.Select
      value={newDevice.type}
      onChange={(event) =>
        setNewDevice({ ...newDevice, type: event.target.value })
      }
    >
      <option>Select Device Type</option>
      {device.types.map((item) => {
        return <option key={item.id}>{item.name}</option>;
      })}
    </Form.Select>
  );
};

export default TypeSelect;
