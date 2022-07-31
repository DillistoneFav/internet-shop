import {makeAutoObservable} from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name:"Холодильники"},
            {id: 2, name:"Смартфоны"}
        ]
        this._brands = [
            {id: 1, name:"Samsung"},
            {id: 2, name:"Apple"},
            {id: 3, name:"Google"}
        ]
        this._devices = [
            {id: 1, name:"Iphone 12 pro", price: 50000, rating: 5, img: 'mock'},
            {id: 2, name:"Iphone 12 ne pro", price: 50000, rating: 5, img: 'mock'},
            {id: 3, name:"Iphone 12 super pro", price: 50000, rating: 5, img: 'mock'},
            {id: 4, name:"Iphone 12 mega pro", price: 50000, rating: 5, img: 'mock'},
            {id: 5, name:"Iphone 12 abaldet pro", price: 50000, rating: 5, img: 'mock'},
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
}