import React, { useState, useContext, useEffect } from 'react'
import AuthFormLayout from '../layouts/AuthFormLayout'
import * as Yup from 'yup'
import { GiDistressSignal } from 'react-icons/gi'
import { UserTypeContext } from '../context/UserTypeContext'
import { useParams, useNavigate } from 'react-router-dom'

const SignupPage = () => {
    const { userType, setUserType } = useContext(UserTypeContext);
    const user = userType === 'candidate' ? 'Candidate' : 'Company'
    const navigate = useNavigate()

    useEffect(() => {
        setUserType(userType);
        localStorage.setItem('userType', userType)
    }, [userType, setUserType]);

    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        designation: '',
        location: '',
        companyName: '',
        companyAddress: '',
        employeeCount: '1-10',
        description: ''
    })

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        name: Yup.string().required("First Name is Required"),
        // designation: Yup.string().required("Designation is Required"),
        description: Yup.string().required('Description is Required'),
        location: Yup.string().required("Location is Required"),
        email: Yup.string()
            .required("Email is Required")
            .email("Invalid email format"),
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, "Phone Number must be 10 digits")
            .required(),
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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignUpForm({
            ...signUpForm,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        let newErrors = {};

        try {
            await validationSchema.validate(signUpForm, { abortEarly: false });
            setErrors([]);
            console.log("Form Submitted", signUpForm);
            //navigate to different route
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
            <AuthFormLayout type="signup" title={`Sign Up as ${user}`} onSubmit={handleSubmit} formData={signUpForm}>
                <div>
                    <label htmlFor="name" className="block mb-2 text-gray-700 font-bold">{user} Name *</label>
                    <input type="name" name="name" id="name" className="border rounded w-full py-2 px-3" placeholder="John Doe" required="" onChange={handleInputChange} />
                </div>
                {errors.name && <div className="error">{errors.name}</div>}
                {userType === 'candidate' ? (
                    <div>
                        <label htmlFor="designation" className="block mb-2 text-gray-700 font-bold">{user} Designation *</label>
                        <input type="designation" name="designation" id="designation" className="border rounded w-full py-2 px-3" placeholder="Software Engineer" required="" onChange={handleInputChange} />
                        {errors.designation && <div className="error">{errors.designation}</div>}
                    </div>) : (
                    <div>
                        <label htmlFor="employeeCount" className="block mb-2 text-gray-700 font-bold">{user} Employee Count *</label>
                        <select
                            id="employeeCount"
                            name="employeeCount"
                            className="border rounded w-full py-2 px-3"
                            onChange={handleInputChange}
                            value={signUpForm.employeeCount}
                            required>
                            <option value="1-10">0-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="200+">200+</option>
                        </select>
                    </div>)
                }
                <div>
                    <label htmlFor="description" className="block mb-2 text-gray-700 font-bold">{user} Description *</label>
                    <textarea type="description" name="description" id="description" className="border rounded w-full py-2 px-3" placeholder="About you" required="" onChange={handleInputChange} />
                </div>
                {errors.description && <div className="error">{errors.description}</div>}
                <div>
                    <label htmlFor="location" className="block mb-2 text-gray-700 font-bold">{user} Location *</label>
                    <input type="location" name="location" id="location" className="border rounded w-full py-2 px-3" placeholder="Cincinnati, OH" required="" onChange={handleInputChange} />
                </div>
                {errors.location && <div className="error">{errors.location}</div>}
                <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700 font-bold">{user} Email *</label>
                    <input type="email" name="email" id="email" className="border rounded w-full py-2 px-3" placeholder="johndoe@company.com" required="" onChange={handleInputChange} />
                </div>
                {errors.email && <div className="error">{errors.email}</div>}

                <div>
                    <label htmlFor="phoneNumber" className="block mb-2 text-gray-700 font-bold">{user} Phone Number *</label>
                    <input type="phoneNumber" name="phoneNumber" id="phoneNumber" className="border rounded w-full py-2 px-3" placeholder="10-digit number" required="" onChange={handleInputChange} />
                </div>
                {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                <div>
                    <label htmlFor="password" className="block mb-2 text-gray-700 font-bold">Password *</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="border rounded w-full py-2 px-3" required="" onChange={handleInputChange} />
                </div>
                {errors.password && <div className="error">{errors.password}</div>}
                <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-gray-700 font-bold">Confirm password *</label>
                    <input type="confirmPassword" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="border rounded w-full py-2 px-3" required="" onChange={handleInputChange} />
                </div>
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

            </AuthFormLayout>
        </div>
        // For company: Name, Description, Employee Count, Headquarter Location, Website, Email, Password
        // For candidate: Name, Designation, Description, Location, Website, Email, Password

    )
}

export default SignupPage