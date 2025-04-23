// src/api.js
import axios from 'axios';

// Define the base URL of your API
const BASE_URL = 'http://localhost:8081/api/v1/users/auth'; // Replace with your API URL

// Create an axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to make login request
export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message; 
    }
};

// Register user
export const register = async (data) => {
    try {
        console.log(data)
        const response = await api.post('/register', data);
        return response.data; // Return response data on success
    } catch (error) {
        throw error.response ? error.response.data : error.message; // Handle error
    }
};

export default api;
