// src/hooks/useJobs.js

import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useFetchJobs = (limit = null) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const params = limit ? { limit } : {};

                const token = localStorage.getItem('token')
                const response = await axios.get('/api/jobs', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token if required
                    },
                    params
                });
                setJobs(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return { jobs, loading, error };
};

export default useFetchJobs;
