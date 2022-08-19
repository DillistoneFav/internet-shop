import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../index";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { fetchOneDevice } from "../../../http/deviceAPI";
import Loader from "../../../components/Loader/Loader";
import ModalHeader from "./DeviceModalComponents/ModalHeader";
import TypeSelect from "./DeviceModalComponents/TypeSelect";
import BrandSelect from "./DeviceModalComponents/BrandSelect";
import NameField from "./DeviceModalComponents/NameField";
import CostField from "./DeviceModalComponents/CostField";
import DescriptionModule from "./DeviceModalComponents/DescriptionModule";
import ImageModule from "./DeviceModalComponents/ImageModule";
import ModalFooter from "./DeviceModalComponents/ModalFooter";

const CreateDevice = ({ editingState, show, onHide, setLoading }) => {
  const { device } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionProps, setDescriptionProps] = useState([]);
  const [newDevice, setNewDevice] = useState({});

  useEffect(() => {
    if (editingState.isEditing && show) {
      setIsLoading(true);
      fetchOneDevice(editingState.id).then((data) => {
        setNewDevice({
          type: getTypeName(data),
          brand: getBrandName(data),
          name: data.name,
          price: data.price,
          image: data.img,
        });
        setDescriptionProps(data.info);
      });
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      setNewDevice({});
      setDescriptionProps([]);
    }
  }, [show]);

  const getTypeName = (data) => {
    const findedObject = device.types.find((item) => {
      return item.id === data.typeId;
    });
    return findedObject.name;
  };
  const getBrandName = (data) => {
    const findedObject = device.brands.find((item) => {
      return item.id === data.brandId;
    });
    return findedObject.name;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <ModalHeader editingState={editingState} />
      {!isLoading ? (
        <Modal.Body>
          <Form>
            <TypeSelect
              device={device}
              newDevice={newDevice}
              setNewDevice={setNewDevice}
            />
            <BrandSelect
              device={device}
              newDevice={newDevice}
              setNewDevice={setNewDevice}
            />
            <NameField newDevice={newDevice} setNewDevice={setNewDevice} />
            <CostField newDevice={newDevice} setNewDevice={setNewDevice} />
            <ImageModule newDevice={newDevice} setNewDevice={setNewDevice} />
            <DescriptionModule
              descriptionProps={descriptionProps}
              setDescriptionProps={setDescriptionProps}
            />
          </Form>
        </Modal.Body>
      ) : (
        <Loader />
      )}
      <ModalFooter
        device={device}
        newDevice={newDevice}
        setNewDevice={setNewDevice}
        descriptionProps={descriptionProps}
        setDescriptionProps={setDescriptionProps}
        onHide={onHide}
        setLoading={setLoading}
        editingState={editingState}
      />
    </Modal>
  );
};

export default CreateDevice;
