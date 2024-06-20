import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserTypeContext } from '../context/UserTypeContext';

const Card = ({ background = 'bg-gray-100', title, subtitle, btncolor = 'bg-black', btntext, btnroute, usertype }) => {
    const { setUserType } = useContext(UserTypeContext);
    const navigate = useNavigate();

    const handleUserTypeClick = (type) => {
        setUserType(type);
        localStorage.setItem('userType', type)
        navigate(`/auth/signup/${type}`);
    };
    return (
        <div className={`${background} p-6 rounded-lg shadow-md`}>
            <h2 class="text-2xl font-bold">{title}</h2>
            <p class="mt-2 mb-4">
                {subtitle}
            </p>
            <button onClick={() => handleUserTypeClick(usertype)} className={`inline-block ${btncolor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}>
                {btntext}
            </button>
        </div>
    )
}

export default Card