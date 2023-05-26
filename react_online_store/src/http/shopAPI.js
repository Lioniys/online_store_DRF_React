import {$host, $authHost} from "./index";


export const getCategory = async () => {
    const response = await $host.get('api/v1/category/');
    return response.data.results;
}

export const getBrand = async () => {
    const response = await $host.get('api/v1/brand/');
    return response.data.results;
}

export const getProducts = async () => {
    const response = await $host.get('api/v1/products/');
    return response.data.results;
}

export const getProduct = async (id) => {
    const response = await $host.get('api/v1/products/' + id + '/');
    return response.data;
}

export const createReview = async (product, text) => {
    await $authHost.post('api/v1/review/', {product, text});

}