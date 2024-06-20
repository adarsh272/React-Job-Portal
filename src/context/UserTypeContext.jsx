// src/context/UserTypeContext.js
import React, { createContext, useState } from 'react';

export const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
    const [userType, setUserType] = useState('');

    return (
        <UserTypeContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserTypeContext.Provider>
    );
};
