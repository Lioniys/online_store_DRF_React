import {makeAutoObservable} from "mobx";


export default class ShopStore {
    constructor() {
        this._category = []
        this._brand = []
        this._products = []
        this._selectedCategory = {}
        makeAutoObservable(this)
    }
    setCategory(category) {
        this._category = category
    }
    setBrand(brand) {
        this._brand = brand
    }
    setProducts(products) {
        this._products = products
    }
    setSelectedCategory(value) {
        this._selectedCategory = value
    }
    get category() {
        return this._category
    }
    get brand() {
        return this._brand
    }
    get products() {
        return this._products
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}