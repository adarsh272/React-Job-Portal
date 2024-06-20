import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useFetchProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(response.data);
            return response
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const updateProfile = async (updatedProfile) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('/api/users/profile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(response.data);
            return response.data;
        } catch (error) {
            setError(error);
            throw error;
        }
    };

    return { profile, loading, error, updateProfile, fetchProfile };
};

export default useFetchProfile;
