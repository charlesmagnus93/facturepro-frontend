import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem(
        "access_token"
    );

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});