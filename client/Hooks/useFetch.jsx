import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', requestData = null, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to trigger API call manually
    const fetchData = useCallback(async (customData = requestData, customMethod = method) => {
        setLoading(true);

        try {
            const response = await axios({
                method: customMethod,
                url,
                data: customData,
                headers,
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, method, requestData, headers]);

    return { data, loading, error, fetchData };
};

export default useFetch;
