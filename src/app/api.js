import axios from "axios";

// Base URL from environment variable
const BASE_URL = 'http://localhost:8081/api/v1/users'; // Replace with your API URL


export const fetchPieChartData = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const response = await axios.get(`${BASE_URL}/dashboard/chart/pie`, config);
        if (response.data.status === "success") {
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};

export const fetchWallet = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const response = await axios.get(`${BASE_URL}/wallets`, config);
        if (response.data.status === "success") {
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};


export const fetchLineChart = async (token, queryParams) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const response = await axios.get(`${BASE_URL}/dashboard/chart/balance-growth?${queryParams}`, config);

        if (response.data.status === "success") {
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};

export const fetchTransactions = async (token, params = {}) => {
    const queryParams = new URLSearchParams({
        page: params.page || 1,
        size: params.size || 10,
        ...(params.sort && { sort: params.sort }),
        ...(params.direction && { direction: params.direction }),
        ...(params.search && { search: params.search }),
        ...(params.sender_number && { sender_number: params.sender_number }),
        ...(params.type && { type: params.type })
    }).toString();

    const response = await fetch(`${BASE_URL}/transactions?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }

    return response.json();
};

import Cookies from "js-cookie";

export async function fetchProfile() {
    const token = Cookies.get("token");
    const response = await fetch(`${BASE_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    if (data.status !== "success") {
        throw new Error(data.message || "Failed to fetch profile");
    }

    return data;
}