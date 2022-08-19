import React from "react";
import Modal from "react-bootstrap/Modal";

const ModalHeader = ({ editingState }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {editingState.isEditing ? (
          <span>Edit deivce</span>
        ) : (
          <span>Create new device</span>
        )}
      </Modal.Title>
    </Modal.Header>
  );
};

export default ModalHeader;
