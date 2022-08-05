import React, { useContext, useState } from "react";
import { Context } from "../../../index";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { observer } from "mobx-react";
import { createDevice } from "../../../http/deviceAPI";

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [descriptionProps, setDescriptionProps] = useState([]);

  const [newDevice, setNewDevice] = useState({
    type: "",
    brand: "",
    name: "",
    price: 0,
    image: "",
  });

  const changeInfo = (key, value, number) => {
    setDescriptionProps(
      descriptionProps.map((item) =>
        item.number === number ? { ...item, [key]: value } : item
      )
    );
  };
  const removeInfo = (number) => {
    setDescriptionProps(descriptionProps.filter((i) => i.number !== number));
  };

  const addNewDevice = () => {
    const brandId = device.brands.find(item => item.name === newDevice.brand);
    const typeId = device.types.find(item => item.name === newDevice.type)
    const formData = new FormData();
    formData.append('name', newDevice.name)
    formData.append('price', `${newDevice.price}`)
    formData.append('img', newDevice.image)
    formData.append('brandId', brandId.id)
    formData.append('typeId', typeId.id)
    formData.append('info', JSON.stringify(descriptionProps))
    createDevice(formData).then(data => onHide())
  };

  const selectFile = (event) => {
    setNewDevice({
      ...newDevice,
      image: event.target.files[0],
    });
  };

  const addProperty = () => {
    setDescriptionProps([
      ...descriptionProps,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
          <Form.Control
            placeholder="Enter device name"
            value={newDevice.name}
            onChange={(event) =>
              setNewDevice({ ...newDevice, name: event.target.value })
            }
          />
          <Form.Control
            className="mt-3 mb-3"
            placeholder="Enter device cost, RUB"
            type="number"
            value={newDevice.price}
            onChange={(event) =>
              setNewDevice({ ...newDevice, price: Number(event.target.value) })
            }
          />
          <Form.Control type="file" onClick={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addProperty}>
            Add new property
          </Button>
          {descriptionProps.map((i) => (
            <Row className="mt-4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Enter property name"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Enter description of property"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="outline-danger">
          Close
        </Button>
        <Button onClick={addNewDevice} variant="outline-primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
