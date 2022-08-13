import {makeAutoObservable} from "mobx";
import {deleteDeviceFromBasket} from "../http/basketApi";

export default class BasketStoreStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(device, isAuth = false) {
        if(isAuth) {
            await deleteDeviceFromBasket(device.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== device.id);
                this._totalPrice -=  device.price;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== device.id);
            this._totalPrice -=  device.price;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(items) {
        this._basketItems = items;
    }

    setDevices(devices) {
        this._devices = devices
    }

    setDeleteAllDeviceFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    
    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}