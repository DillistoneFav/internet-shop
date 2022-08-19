import React from "react";
import Form from "react-bootstrap/Form";

const BrandSelect = ({ device, newDevice, setNewDevice }) => {
  return (
    <Form.Select
      className="mt-3 mb-3"
      value={newDevice.brand}
      onChange={(event) =>
        setNewDevice({ ...newDevice, brand: event.target.value })
      }
    >
      <option>Select Device Brand</option>
      {device.brands.map((item) => {
        return <option key={item.id}>{item.name}</option>;
      })}
    </Form.Select>
  );
};

export default BrandSelect;
