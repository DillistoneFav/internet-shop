import {makeAutoObservable} from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name:"Холодильники"},
            {id: 2, name:"Смартфоны"},
            {id: 3, name:"Ноутбуки"},
            {id: 4, name:"Телевизоры"},
            {id: 5, name:"Мониторы"},
        ]
        this._brands = [
            {id: 1, name:"Samsung"},
            {id: 2, name:"Apple"},
            {id: 3, name:"Google"},
            {id: 4, name:"Lenovo"},
            {id: 5, name:"Asus"},
        ]
        this._devices = [
            {id: 1, name:"Iphone 12 pro", price: 50000, rating: 1, img: 'mock'},
            {id: 2, name:"Iphone 12 ne pro", price: 50000, rating: 2, img: 'mock'},
            {id: 3, name:"Iphone 12 super pro", price: 50000, rating: 3, img: 'mock'},
            {id: 4, name:"Iphone 12 mega pro", price: 50000, rating: 4, img: 'mock'},
            {id: 5, name:"Iphone 12 abaldet pro", price: 50000, rating: 5, img: 'mock'},
        ]
        this._selectedType = {}
        this._selectedBrand = {}
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

    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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

    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}