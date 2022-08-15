import { makeAutoObservable } from "mobx";
import { deleteDeviceFromBasket } from "../http/basketApi";

export default class BasketStoreStore {
  constructor() {
    this._totalPrice = 0;
    this._basket = [];
    makeAutoObservable(this);
  }

  async setDeleteItemBasket(device) {
    await deleteDeviceFromBasket(device.id).then(() => {
      this._basket = this._basket.filter((item) => item.id !== device.id);
      this._totalPrice -= device.price;
      localStorage.setItem('cart', this._basket ? this._basket : [])
    });
  }

  setDeleteAllDeviceFromBasket() {
    this._totalPrice = 0;
    return (this._basket = []);
  }

  resetBasket() {
    this._basket = [];
    this._totalPrice = 0;
    localStorage.setItem('cart', [])
  }

  addItem(item) {
    this._basket = [...this._basket, item]
  }
  

  setBasket(items) {
    this._basket = items;
  }
  setTotalPrice(price) {
    return this._totalPrice = price;
  }


  get Basket() {
    return this._basket;
  }
  get Price() {
    return this._totalPrice;
  }
}
