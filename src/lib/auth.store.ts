import { writable } from 'svelte/store';
import { apiPost } from './api.util';
import type { UserDTO } from './auth.dto';

export const userState = writable<UserDTO | null>(null);
export const isAuthenticated = writable<boolean>(false);
export const authError = writable<string | null>(null);
export const loading = writable<boolean>(false);

export async function login(username: string, password: string) {
    authError.set(null);
    loading.set(true);
    try {
        const userData: Response = await apiPost('/auth/login', {
            username,
            password
        });
        const json = await userData.json();
        userState.set(json);
        localStorage.setItem('token', json.data);
        isAuthenticated.set(userData.ok);
    } catch (err: any) {
        console.log(err);
        authError.set('Login failed ' + err.message);
    }
    loading.set(false);
}

export async function register(username: string, password: string) {
    authError.set(null);
    loading.set(true);
    try {
        const userData: Response = await apiPost('/auth/register', {
            username,
            password
        });

        const json = await userData.json();
        userState.set(json);
        localStorage.setItem('token', json.data);
        isAuthenticated.set(userData.ok);
    } catch (err: any) {
        authError.set('Registration failed ' + err.message);
    }
    loading.set(false);
}