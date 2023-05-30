import axios from "axios";


const $host = axios.create({
    baseURL: 'http://localhost:8000'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:8000'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('access')}`
    return config
}

const responseInterceptor = async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $host.post('api/v1/token/refresh/' ,
                {refresh: localStorage.getItem('refresh')});
            localStorage.setItem('access', response.data.access);
            return $authHost.request(originalRequest);
        } catch (e) {
            console.log('не авторизован')
        }
    }
    throw error;
}

$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use((config) => {
    return config
}, responseInterceptor)

export {
    $host,
    $authHost
}