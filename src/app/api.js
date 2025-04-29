import useAuthStore from "@/stores/authStore";
import axios from "axios";

console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/v1/users';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const fetchPieChartData = async () => {
    try {
        const response = await api.get(`/dashboard/chart/pie`);
        if (response.data.status === "success") {
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};

export const fetchWallet = async () => {
    try {
        const response = await api.get(`/wallets`);
        console.log(response)
        if (response.status == "200") {
            return response.data.wallets;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};
export const fetchCategory = async () => {
    try {
        const response = await api.get(`/transactions/categories`);
        console.log(response)
        if (response.status == "200") {
            return response.data.transaction_categories;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};

export const fetchQrData = async (number) => {
    try {

        const response = await api.get(`/wallets/${number}/qr`, {
            responseType: 'arraybuffer'  // Important: handle binary data
        });
        if (response.status == "200") {
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};
export const fetchMethod = async () => {
    try {
        const response = await api.get(`/transactions/methods`);
        console.log(response)
        if (response.status == "200") {
            return response.data.transaction_top_up_methods;
        }
        throw new Error(response.data.message || "Failed to fetch transaction methods");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};


export const fetchLineChart = async (queryParams) => {
    try {
        const response = await api.get(`/dashboard/chart/balance-growth?${queryParams}`);

        if (response.status == "200") {
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};

export const fetchTransactions = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams({
            page: params.page || 1,
            size: params.size || 10,
            ...(params.sort && { sort: params.sort }),
            ...(params.direction && { direction: params.direction }),
            ...(params.search && { search: params.search }),
            ...(params.sender_number && { sender_number: params.sender_number }),
            ...(params.type && { type: params.type })
        }).toString();

        const response = await api.get(`/transactions?${queryParams}`);

        if (!(response.status == 200)) {
            throw new Error('Failed to fetch transactions');
        }
        return response.data
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};


export const fetchTotBalance = async () => {

    const response = await api.get(`/dashboard/chart/total-trans`);

    if (!(response.status == "200")) {
        throw new Error('Failed to fetch transactions');
    }

    return response.data;
};

import Cookies from "js-cookie";

export async function fetchProfile() {
    const token = Cookies.get("token");
    const response = await api.get(`/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!(response.status === 200)) {
        throw new Error("Failed to fetch profile");
    }

    return response;
}

// Create wallet
export const createWallet = async (formData) => {
    try {
        const response = await api.post('/wallets', formData);
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
export const getEstatement = async (params) => {
    try {
        const response = await api.get(`/generate-wallet-statement${params}`, {
            responseType: 'blob', // Important for handling PDF files
            headers: {
                Accept: 'application/pdf',
            }
        });;
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const createPin = async (data) => {
    try {
        const response = await api.post('/auth/pins', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

export const fetchLatestRecipients = async () => {
    try {
        const response = await api.get('/wallets/latest');
        if (response.status === 200) {
            return response.data.wallets;
        }
        throw new Error(response.data.message || "Failed to fetch recipients");
    } catch (error) {
        throw new Error(error.message || "Error fetching recipients");
    }
};

export const transferFunds = async (transferData) => {
    try {
        const response = await api.post('/transactions/transfer', transferData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const topupFunds = async (topupData) => {
    try {
        const response = await api.post('/transactions/topup', topupData);
        return response.data.transactions;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const searchWallet = async (number) => {
    try {
        const response = await api.get(`/wallets/${number}`);
        if (response.data.status === "success") {
            return response.data.wallets;
        }
        throw new Error(response.data.message || "Wallet not found");
    } catch (error) {
        throw error.response?.data?.message || "Failed to find wallet";
    }
};

export default api;
