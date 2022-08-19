import React from "react";
import Form from "react-bootstrap/Form";

const ImageModule = ({ newDevice, setNewDevice }) => {
  const selectFile = (event) => {
    setNewDevice({
      ...newDevice,
      image: event.target.files[0],
    });
  };

  return (
    <div>
      <Form.Control type="file" onChange={selectFile} />
      <hr />
    </div>
  );
};

export default ImageModule;
