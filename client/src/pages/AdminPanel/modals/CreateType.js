import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CreateType = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Control placeholder="Enter the type name"/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="outline-danger">Close</Button>
          <Button onClick={onHide} variant="outline-primary">Create</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default CreateType;