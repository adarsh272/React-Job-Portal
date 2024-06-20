// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import * as decode from 'jwt-decode'; // Correct import for jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the token to get the user information
            const decodedUser = decodeToken(token);
            setUser(decodedUser);
        }
        setLoading(false)
    }, []);

    const login = (token) => {
        // Store the token in localStorage
        localStorage.setItem('token', token);
        // Decode the token to get the user information
        const decodedUser = decodeToken(token);
        setUser(decodedUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const decodeToken = (token) => {
        try {
            return decode.jwtDecode(token);
        } catch (error) {
            console.error('Failed to decode token', error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
