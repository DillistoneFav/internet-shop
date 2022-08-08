import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createBrand } from "../../../http/deviceAPI";

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('');

  const addBrand = () => {
    createBrand({name: value}).then(data => {
      setValue('')
      onHide();
    })
  }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new Brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Control value={value} onChange={(event) => setValue(event.target.value)} placeholder="Enter the brand name"/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="outline-danger">Close</Button>
          <Button onClick={addBrand} disabled={!value} variant="outline-primary">Create</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default CreateBrand;