// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element, userType }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div>Laoding...</div>
    }
    if (!user) {
        return <Navigate to={`/auth/login/${userType}`} />;
    }

    return element;
};

export default ProtectedRoute;
