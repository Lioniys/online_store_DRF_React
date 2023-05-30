import {makeAutoObservable} from "mobx";


export default class ShopState {

    constructor() {
        this._category = []
        this._brands = []
        this._products = []
        this._page = 1
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setPage(page) {
        this._page = page
    }

    get page() {
        return this._page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    get totalCount() {
        return this._totalCount
    }

    setCategory(category) {
        this._category = category
    }

    get category() {
        return this._category
    }

    setBrands(brands) {
        this._brands = brands
    }

    get brands() {
        return this._brands
    }

    setProducts(products) {
        this._products = products
    }

    get products() {
        return this._products
    }
}