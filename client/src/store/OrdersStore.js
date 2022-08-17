import {makeAutoObservable} from "mobx";

export default class OrderStore {
    constructor() {
        this._orders = []
        makeAutoObservable(this)
    }

    setOrders(ordersData) {
        this._orders = ordersData
    }

    get orders() {
        return this._orders
    }
}