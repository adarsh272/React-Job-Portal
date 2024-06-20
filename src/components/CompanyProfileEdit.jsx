// CandidateProfileEdit.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';


const validationSchema = Yup.object({
    profilePic: Yup.mixed().required("Please upload your profile picture"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    location: Yup.string().required("Location is required"),
    website: Yup.string().matches(
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
        'Enter correct url!'
    ).required(),
    description: Yup.string().required('Please tell us more about your company'),
    employeeCount: Yup.string().required("Skill is required"),
    email: Yup.string().email("Invalid email format")
});

const CompanyProfileEdit = ({ profile, onSave }) => {
    const [profilePic, setProfilePic] = useState(null);

    const handleSubmit = async (updatedProfileValues) => {
        const formData = new FormData();
        Object.keys(updatedProfileValues).forEach(key => {
            if (key === 'profilePic') {
                formData.append(key, updatedProfileValues[key]);
            } else {
                formData.append(key, updatedProfileValues[key]);
            }
        });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('/api/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            await onSave();
            return response.data;
        } catch (error) {
            console.error('Failed to update profile', error);
            throw error;
        }
    };

    const handleProfilePicChange = (event, setFieldValue) => {
        setProfilePic(URL.createObjectURL(event.currentTarget.files[0]));
        setFieldValue("profilePic", event.currentTarget.files[0]);
    };

    return (
        <div>
            <section class="bg-indigo-50">
                <div class="container m-auto max-w-2xl py-24">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        Company Profile
                    </h2>
                    <div class="w-full bg-white rounded-lg shadow dark:border">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Edit Your Profile
                            </h1>
                            <Formik
                                initialValues={{
                                    profilePic: profile.profilePic ? `http://localhost:5000/${profile.profilePic?.replace('\\', '/')}` : '',
                                    name: profile.name,
                                    phoneNumber: profile.phoneNumber,
                                    location: profile.location,
                                    website: profile.website,
                                    description: profile.description,
                                    employeeCount: profile.employeeCount,
                                    email: profile.email
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        <div className="mb-4">
                                            <label htmlFor="profilePic" className="block mb-2 text-gray-700 font-bold">Profile Picture *</label>
                                            <input
                                                type="file"
                                                name="profilePic"
                                                id="profilePic"
                                                accept="image/*"
                                                className="border rounded w-full py-2 px-3"
                                                onChange={(event) => handleProfilePicChange(event, setFieldValue)}
                                            />
                                            {profilePic && <img src={profilePic} alt="Profile" className="mt-2 w-32 h-32 object-cover rounded-full" />}
                                            <ErrorMessage name="profilePic" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block mb-2 text-gray-700 font-bold">Company Name *</label>
                                            <Field type="text" name="name" id="name" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="name" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block mb-2 text-gray-700 font-bold">Description *</label>
                                            <Field component="textarea" type="text" name="description" id="description" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="description" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phoneNumber" className="block mb-2 text-gray-700 font-bold">Phone Number *</label>
                                            <Field type="text" name="phoneNumber" id="phoneNumber" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="phoneNumber" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block mb-2 text-gray-700 font-bold">Headquarter Location *</label>
                                            <Field type="text" name="location" id="location" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="location" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="website" className="block mb-2 text-gray-700 font-bold">Website*</label>
                                            <Field type="text" name="website" id="website" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="website" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="employeeCount" className="block mb-2 text-gray-700 font-bold">Size*</label>
                                            <Field as="select" name="employeeCount" className="border rounded w-full py-2 px-3">
                                                <option value="1-10">0-10</option>
                                                <option value="11-50">11-50</option>
                                                <option value="51-200">51-200</option>
                                                <option value="200+">200+</option>
                                            </Field>
                                            <ErrorMessage name="employeeCount" component="div" className="text-red-600" />

                                        </div>
                                        <div className="mt-4">
                                            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full">Save Profile</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default CompanyProfileEdit;
