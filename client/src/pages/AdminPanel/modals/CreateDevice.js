/* eslint-disable react/jsx-no-undef */
import React, { useContext, useState } from "react";
import { Context } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [description, setDescription] = useState([]);

  const addProperty = () => {
    setDescription([
      ...description,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  const removeInfo = (number) => {
    setDescription(description.filter((i) => i.number !== number));
  };
  const changeInfo = (key, value, number) => {
    setDescription(
      description.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
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
          <Form.Select>
            <option>Select Device Type</option>
            {device.types.map((item) => {
              return <option key={item.id}>{item.name}</option>;
            })}
          </Form.Select>
          <Form.Select className="mt-3 mb-3">
            <option>Select Device Brand</option>
            {device.brands.map((item) => {
              return <option key={item.id}>{item.name}</option>;
            })}
          </Form.Select>
          <Form.Control placeholder="Enter device name" />
          <Form.Control
            className="mt-3 mb-3"
            placeholder="Enter device cost, RUB"
            type="number"
          />
          <Form.Control type="file" />
          <hr />
          <Button variant="outline-dark" onClick={addProperty}>
            Add new property
          </Button>
          {description.map((i) => (
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
        <Button onClick={onHide} variant="outline-primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
