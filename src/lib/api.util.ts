const baseUrl = 'http://localhost:8080'

function buildUrl(endpoint: string, params?: Record<string, string | number | null | undefined>): string {
    const url = new URL(endpoint, baseUrl); // Ganti dengan base URL API kamu
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                url.searchParams.append(key, value.toString());
            }
        });
    }
    return url.toString();
}

export async function apiGet(endpoint: string, params?: Record<string, string | number | null | undefined>, token?: string | null): Promise<Response> {
    try {
        const url = buildUrl(endpoint, params);
        let headers: HeadersInit = {};
        if (token != null) headers['Authorization'] = `Bearer ${token}`
        return fetch(url, {
            headers: headers
        });
    } catch (error: any) {
        throw new Error(`GET request failed: ${error.message}`);
    }
}

export async function apiPost<U>(endpoint: string, data: U, token?: string | null): Promise<Response> {
    try {
        const url = new URL(endpoint, baseUrl);
        let headers: HeadersInit = {
            'Content-Type': 'application/json'
        };
        if (token != null) headers['Authorization'] = `Bearer ${token}`
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
    } catch (error: any) {
        throw new Error(`POST request failed: ${error.message}`);
    }
}

export async function apiPut<U>(endpoint: string, data: U, token?: string | null): Promise<Response> {
    try {
        const url = new URL(endpoint, baseUrl);
        let headers: HeadersInit = {
            'Content-Type': 'application/json'
        };
        if (token != null) headers['Authorization'] = `Bearer ${token}`
        const response = fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
        });
        return response;
    } catch (error: any) {
        throw new Error(`PUT request failed: ${error.message}`);
    }
}

export async function apiDelete(endpoint: string, token?: string | null): Promise<Response> {
    try {
        const url = new URL(endpoint, baseUrl);
        let headers: HeadersInit = {};
        if (token != null) headers['Authorization'] = `Bearer ${token}`
        return fetch(url, {
            method: 'DELETE',
            headers: headers
        });
    } catch (error: any) {
        throw new Error(`DELETE request failed: ${error.message}`);
    }
}