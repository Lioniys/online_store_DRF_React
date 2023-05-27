import {makeAutoObservable} from "mobx";


export default class ShopStore {
    constructor() {
        this._category = []
        this._brand = []
        this._products = []
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }
    setLimit(limit) {
        this._limit = limit
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
        this.setPage(1)
        this._selectedCategory = value
    }
    get category() {
        return this._category
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
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