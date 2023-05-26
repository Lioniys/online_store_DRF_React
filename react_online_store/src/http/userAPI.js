import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (username, password, email) => {
    const response = await $host.post('api/v1/register/', {username, password, email});
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return jwtDecode(response.data.access)["user_id"];
}

export const login = async (username, password) => {
    const response = await $host.post('api/v1/token/access/', {username, password});
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return jwtDecode(response.data.access)["user_id"];
}

export const check = async () => {
    const response = await $authHost.get('')
}