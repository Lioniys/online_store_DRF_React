import {makeAutoObservable} from "mobx";


export default class UserState {

    constructor() {
        this._isAuth = false
        this._user = {}
        this._showAuth = false
        makeAutoObservable(this)
    }

    logOut = () => {
        this._user = {}
        this._isAuth = false
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }

    setShowAuth(bool) {
        this._showAuth = bool
    }

    get showAuth() {
        return this._showAuth
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    get isAuth() {
        return this._isAuth
    }

    setUser(user) {
        this._user = user
    }

    get user() {
        return this._user
    }
}