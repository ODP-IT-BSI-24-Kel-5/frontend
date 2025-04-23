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
            console.log(response.data)
            return response;
        }
        throw new Error(response.data.message || "Failed to fetch data");
    } catch (error) {
        throw new Error(error.message || "Error fetching data");
    }
};
