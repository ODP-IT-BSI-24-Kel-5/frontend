// src/api.js

import axios from 'axios';
import useAuthStore from '@/stores/authStore';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth` || 'http://localhost:8081/api/v1/users/auth';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        if (response.data?.token) {
            useAuthStore.getState().setToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
// Register user
export const register = async (data) => {
    try {
        const response = await api.post('/register', data);
        return response.data; // Return response data on success
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Handle error
    }
};

export default api;
