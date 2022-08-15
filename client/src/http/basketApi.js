import {$authHost, $host} from "./index";

export const addDeviceToBasket = async (device) => {
    const {data} = await $authHost.post('api/basket', device);
    const oldBasket = localStorage.getItem('cart');
    localStorage.setItem('cart', JSON.stringify([...oldBasket, device]))
    return data;
}

export const fetchBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    localStorage.setItem('cart', JSON.stringify(data))
    return data;
}

export const deleteDeviceFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}