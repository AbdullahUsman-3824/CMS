import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'GET', requestData = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios({
            method,
            url,
            data: requestData,
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url, method, requestData]);

    return { data, loading, error };
};
