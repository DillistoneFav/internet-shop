import React from "react";
import { createDevice, updateDevices } from "../../../../http/deviceAPI";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalFooter = ({
  device,
  newDevice,
  setNewDevice,
  descriptionProps,
  setDescriptionProps,
  onHide,
  setLoading,
  editingState,
}) => {
  const actionsOnCloseModal = () => {
    setNewDevice({});
    setDescriptionProps([]);
    onHide();
  };

  const formDataAppend = () => {
    const brandId = device.brands.find((item) => item.name === newDevice.brand);
    const typeId = device.types.find((item) => item.name === newDevice.type);
    const formData = new FormData();
    formData.append("name", newDevice.name);
    formData.append("price", `${newDevice.price}`);
    formData.append("img", newDevice.image);
    formData.append("brandId", brandId.id);
    formData.append("typeId", typeId.id);
    formData.append("info", JSON.stringify(descriptionProps));

    return formData;
  };
  const addNewDevice = async () => {
    setLoading(true);
    const formData = formDataAppend();
    try {
      await createDevice(formData).then((data) => {
        actionsOnCloseModal();
        setTimeout(() => setLoading(false), 1000);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const updateDevice = async () => {
    setLoading(true);
    const formData = formDataAppend();
    try {
      await updateDevices(editingState.id, formData).then((data) => {
        actionsOnCloseModal();
        setTimeout(() => setLoading(false), 1000);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Modal.Footer>
      <Button onClick={onHide} variant="outline-danger">
        Close
      </Button>
      <Button
        onClick={editingState.isEditing ? updateDevice : addNewDevice}
        variant="outline-primary"
        disabled={
          !newDevice.name ||
          !newDevice.price ||
          !newDevice.image ||
          !newDevice.brand ||
          !newDevice.type ||
          !descriptionProps.length
        }
      >
        {editingState.isEditing ? <span>Update</span> : <span>Create</span>}
      </Button>
    </Modal.Footer>
  );
};

export default ModalFooter;
