import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = () => {
    const pageName = 'auth'
    return (
        <>
            <Navbar pagename={pageName} />
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default AuthLayout