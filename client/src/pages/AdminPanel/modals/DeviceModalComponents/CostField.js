import React from "react";
import Form from "react-bootstrap/Form";

const CostField = ({ newDevice, setNewDevice }) => {
  return (
    <Form.Control
      className="mt-3 mb-3"
      placeholder="Enter device cost, RUB"
      type="number"
      value={newDevice.price}
      onChange={(event) =>
        setNewDevice({
          ...newDevice,
          price: Number(event.target.value),
        })
      }
    />
  );
};

export default CostField;
