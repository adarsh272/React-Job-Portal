import React, { useContext, useState, useEffect } from 'react'
import AuthFormLayout from '../layouts/AuthFormLayout'
import * as Yup from 'yup'
import { UserTypeContext } from '../context/UserTypeContext'
import { useParams } from 'react-router-dom'

const LoginPage = () => {
    const { setUserType } = useContext(UserTypeContext);
    const { userType } = useContext(UserTypeContext)
    const user = userType === 'candidate' ? 'Candidate' : 'Company'
    const [loginForm, setSignUpForm] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        setUserType(userType);
        localStorage.setItem('userType', userType)
    }, [userType, setUserType]);
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email is Required")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one symbol"
            )
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignUpForm({
            ...loginForm,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        let newErrors = {};

        try {
            await validationSchema.validate(loginForm, { abortEarly: false });
            setErrors([]);
            console.log("Form Submitted", loginForm);
            //a function to make an ajax call for signup and navigate to different route.
        } catch (error) {
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            throw new Error("Validation failed");
        }
    };
    return (
        <div>
            <AuthFormLayout type="login" title={`Log In as ${userType}`} formData={loginForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700 font-bold">{user} email *</label>
                    <input type="email" name="email" id="email" className="border rounded w-full py-2 px-3" placeholder="johndoe@company.com" required="" onChange={handleInputChange} />
                </div>
                {errors.email && <div className="error">{errors.email}</div>}
                <div>
                    <label htmlFor="password" className="block mb-2 text-gray-700 font-bold">Password *</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="border rounded w-full py-2 px-3" required="" onChange={handleInputChange} />
                </div>
                {errors.password && <div className="error">{errors.password}</div>}

            </AuthFormLayout>
        </div>
    )
}

export default LoginPage