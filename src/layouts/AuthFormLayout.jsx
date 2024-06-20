import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserTypeContext } from '../context/UserTypeContext';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';


const AuthFormLayout = ({ type, title, onSubmit, children, formData }) => {
    const { userType } = useContext(UserTypeContext);
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const navLink = userType == 'candidate' ? '/candidate-portal' : '/company-portal'
    const navigate = useNavigate()
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await onSubmit();
            await signUpApiCall()
            //a function to make an ajax call for signup and navigate to different route.
        } catch (error) {
            toast.error(error.msg)
            console.log(error, 'Form Submission Failed');
        }
    }

    const signUpApiCall = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/auth/${type}`, {
                ...formData,
                userType,
            });
            toast.success(`${type} Successsfull. Welcome!`)
            localStorage.setItem('token', response.data.token);
            login(response.data.token);
            navigate(navLink)
        } catch (error) {
            toast.error(error.response.data.msg || `Please try again`)
        } finally {
            setLoading(false);
        }
    }

    const handleLinkClick = (usertype, action) => {
        navigate(`/auth/${action}/${usertype}`)
    }

    return (
        <div>
            <section class="bg-indigo-50">
                <div class="container m-auto max-w-2xl py-24">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        Welcome to React Jobs!
                    </h2>
                    <div class="w-full bg-white rounded-lg shadow dark:border">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                {title}
                            </h1>
                            <form onSubmit={submitForm} class="space-y-4 md:space-y-6" action="#">
                                {children}
                                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">{title}</button>
                                {type === 'signup' ? <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <button onClick={() => handleLinkClick(userType, 'login')} class="font-medium text-indigo-500 font-bold hover:underline">Login here</button>
                                </p> : <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account? <button onClick={() => handleLinkClick(userType, 'signup')} class="font-medium text-indigo-500 font-bold hover:underline">Sign Up here</button>
                                </p>}

                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}

export default AuthFormLayout