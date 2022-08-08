import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createType } from "../../../http/deviceAPI";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('');

  const addType = () => {
    createType({name: value}).then(data => {
      setValue('')
      onHide();
    })
  }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Control value={value} onChange={(event) => setValue(event.target.value)} placeholder="Enter the type name"/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="outline-danger">Close</Button>
          <Button onClick={addType} disabled={!value} variant="outline-primary">Create</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default CreateType;