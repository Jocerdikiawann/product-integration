import { get, writable } from 'svelte/store';
import { apiDelete, apiGet, apiPost, apiPut } from './api.util';
import type { UserDTO } from './auth.dto';
import { userState } from './auth.store';

const user: UserDTO | null = get(userState);

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: Date;
}

const token = localStorage.getItem('token');
export const errorData = writable<string | null>(null);
export const loading = writable<boolean>(false);
export const products = writable<ProductDTO[]>([]);

export async function getProducts(name?: string | null, minPrice?: number | null, maxPrice?: number | null) {
    errorData.set(null);
    loading.set(true);
    try {
        const params = {
            name,
            minPrice,
            maxPrice
        }
        const response: Response = await apiGet(`/products`, params, token);
        const json = await response.json();

        if (response.ok) {
            products.set(json.data);
        } else {
            errorData.set(json.message)
        }

    } catch (err: any) {
        console.log(err);
        errorData.set('createProducts failed ' + err.message);
    }
    loading.set(false);
}

export async function createProducts(name: string, description: string, price: number) {
    errorData.set(null);
    loading.set(true);
    try {
        const response: Response = await apiPost('/products/create', {
            name,
            description,
            price
        }, token);
        const json = await response.json();
        if (response.ok) {
            await getProducts();
        } else {
            errorData.set(json.message);
        }

    } catch (err: any) {
        console.log(err);
        errorData.set('createProducts failed ' + err.message);
    }
    loading.set(false);
}

export async function updateProduct(id: number, name: string, description: string, price: number) {
    errorData.set(null);
    loading.set(true);
    try {
        const response: Response = await apiPut(`/products/${id}`, {
            name,
            description,
            price
        }, token);
        const json = await response.json();

        if (response.ok) {
            await getProducts();
        } else {
            errorData.set(json.message);
        }

    } catch (err: any) {
        console.log(err);
        errorData.set('createProducts failed ' + err.message);
    }
    loading.set(false);
}

export async function deleteProduct(id: number) {
    errorData.set(null);
    loading.set(true);
    try {
        const response: Response = await apiDelete(`/products/${id}`, token);
        const json = await response.json();
        if (!response.ok) {
            errorData.set(json.message);
        } else {
            await getProducts();
        }
    } catch (err: any) {
        errorData.set('deleteProduct failed ' + err.message);
    }
    loading.set(false);
}