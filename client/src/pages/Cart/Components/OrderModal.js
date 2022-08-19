import React, {useState} from 'react';
import { Modal, Input } from "antd";
import { sendOrder } from "../../../http/ordersApi";
import { SHOP_ROUTE } from "../../../utils/constants";

const OrderModal = ({basket, isModalVisible, setIsModalVisible, navigate}) => {
    const [phoneNubmer, setPhoneNubmer] = useState(0);

    const handleOk = async () => {
        phoneNubmer.length === 11
          ? await sendOrder({ mobile: phoneNubmer, basket: basket.Basket }).then(
              (data) => {
                basket.Basket.forEach((item) => basket.setDeleteItemBasket(item));
                setIsModalVisible(false);
                navigate(SHOP_ROUTE);
              }
            )
          : alert("enter the correct phone number!");
      };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
        title="Your order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="d-flex flex-column">
          {basket.Basket.map((item) => (
            <span key={item.id}>{item.name}</span>
          ))}
        </div>
        <div className="mt-3">Please enter your phone:</div>
        <Input
          value={phoneNubmer}
          onChange={(event) => setPhoneNubmer(event.target.value)}
          type="number"
          placeholder="89114567899"
        />
      </Modal>
    );
};

export default OrderModal;