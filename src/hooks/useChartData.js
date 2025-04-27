import { useState, useEffect } from 'react';
import { fetchLineChart, fetchPieChartData } from '../api';
import Cookies from 'js-cookie';

export function useChartData(chartType, initialConfig = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (params = {}) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const fetchFn = chartType === 'pie' ? fetchPieChartData : fetchLineChart;
            const response = await fetchFn(token, params);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(initialConfig);
    }, []);

    return { data, loading, error, refetch: fetchData };
}