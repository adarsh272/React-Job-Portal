import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useFetchJobsForCompany = (companyId) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/jobs/company/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setJobs(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [companyId]);

    return { jobs, loading, error };
};

export default useFetchJobsForCompany;
