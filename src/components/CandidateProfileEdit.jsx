// CandidateProfileEdit.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const validationSchema = Yup.object({
    profilePic: Yup.mixed().required("Please upload your profile picture"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    designation: Yup.string(),
    location: Yup.string().required("Location is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    website: Yup.string().url("Invalid URL format"),
    workExperience: Yup.array().of(
        Yup.object({
            companyName: Yup.string().required("Company name is required"),
            startDate: Yup.date().required("Start date is required"),
            endDate: Yup.date().nullable(),
            designation: Yup.string().required("Designation is required"),
            responsibilities: Yup.string().required("Responsibilities are required"),
        })
    ),
    skills: Yup.array().of(Yup.string().required("Skill is required")),
});

const CandidateProfileEdit = ({ profile, onSave }) => {
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
            onSave();
            return response.data;
        } catch (error) {
            toast.error(`Failed to update profile:${error.response.statusText}`)
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
                        Candidate Profile
                    </h2>
                    <div class="w-full bg-white rounded-lg shadow dark:border">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Edit Your Profile
                            </h1>
                            <Formik
                                initialValues={{
                                    profilePic: profile.profilePic ? `http://localhost:5000/${profile.profilePic?.replace('\\', '/')}` : '',
                                    name: profile.name ? profile.name : '',
                                    designation: profile.designation ? profile.designation : '',
                                    phoneNumber: profile.phoneNumber ? profile.phoneNumber : '',
                                    location: profile.location ? profile.location : '',
                                    email: profile.email ? profile.email : '',
                                    website: profile.website ? profile.website : '',
                                    workExperience: profile.workExperience?.length > 0 ? profile.workExperience : [{
                                        companyName: '',
                                        startDate: '',
                                        endDate: '',
                                        designation: '',
                                        responsibilities: '',
                                    }],
                                    skills: profile.skills.length > 0 ? profile.skills : ['']
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
                                            <label htmlFor="name" className="block mb-2 text-gray-700 font-bold">Name *</label>
                                            <Field type="text" name="name" id="name" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="name" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="designation" className="block mb-2 text-gray-700 font-bold">Designation *</label>
                                            <Field type="text" name="designation" id="designation" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="designation" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="phoneNumber" className="block mb-2 text-gray-700 font-bold">Phone Number *</label>
                                            <Field type="text" name="phoneNumber" id="phoneNumber" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="phoneNumber" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block mb-2 text-gray-700 font-bold">Location *</label>
                                            <Field type="text" name="location" id="location" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="location" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block mb-2 text-gray-700 font-bold">Email *</label>
                                            <Field type="email" name="email" id="email" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="email" component="div" className="text-red-600" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="website" className="block mb-2 text-gray-700 font-bold">Website</label>
                                            <Field type="text" name="website" id="website" className="border rounded w-full py-2 px-3" />
                                            <ErrorMessage name="website" component="div" className="text-red-600" />
                                        </div>
                                        <FieldArray name="workExperience">
                                            {({ push, remove }) => (
                                                <div>
                                                    <h2 className="text-xl font-bold mb-2">Work workExperience</h2>
                                                    {values.workExperience.map((_, index) => (
                                                        <div key={index} className="mb-4 border p-4 rounded">
                                                            <div className="mb-2">
                                                                <label htmlFor={`workExperience.${index}.companyName`} className="block mb-2 text-gray-700 font-bold">Company Name *</label>
                                                                <Field type="text" name={`workExperience.${index}.companyName`} id={`workExperience.${index}.companyName`} className="border rounded w-full py-2 px-3" />
                                                                <ErrorMessage name={`workExperience.${index}.companyName`} component="div" className="text-red-600" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <label htmlFor={`workExperience.${index}.startDate`} className="block mb-2 text-gray-700 font-bold">Start Date *</label>
                                                                <Field type="date" name={`workExperience.${index}.startDate`} id={`workExperience.${index}.startDate`} className="border rounded w-full py-2 px-3" />
                                                                <ErrorMessage name={`workExperience.${index}.startDate`} component="div" className="text-red-600" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <label htmlFor={`workExperience.${index}.endDate`} className="block mb-2 text-gray-700 font-bold">End Date</label>
                                                                <Field type="date" name={`workExperience.${index}.endDate`} id={`workExperience.${index}.endDate`} className="border rounded w-full py-2 px-3" />
                                                                <ErrorMessage name={`workExperience.${index}.endDate`} component="div" className="text-red-600" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <label htmlFor={`workExperience.${index}.designation`} className="block mb-2 text-gray-700 font-bold">Designation *</label>
                                                                <Field type="text" name={`workExperience.${index}.designation`} id={`workExperience.${index}.designation`} className="border rounded w-full py-2 px-3" />
                                                                <ErrorMessage name={`workExperience.${index}.designation`} component="div" className="text-red-600" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <label htmlFor={`workExperience.${index}.responsibilities`} className="block mb-2 text-gray-700 font-bold">Responsibilities *</label>
                                                                <Field as="textarea" name={`workExperience.${index}.responsibilities`} id={`workExperience.${index}.responsibilities`} className="border rounded w-full py-2 px-3" />
                                                                <ErrorMessage name={`workExperience.${index}.responsibilities`} component="div" className="text-red-600" />
                                                            </div>
                                                            <div className="mb-2">
                                                                <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button type="button" onClick={() => push({ companyName: '', startDate: '', endDate: '', designation: '', responsibilities: '' })} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">Add Experience</button>
                                                </div>
                                            )}
                                        </FieldArray>
                                        <FieldArray name="skills">
                                            {({ push, remove }) => (
                                                <div>
                                                    <h2 className="text-xl font-bold mb-2">Skills</h2>
                                                    {values.skills.map((_, index) => (
                                                        <div key={index} className="mb-4 flex items-center">
                                                            <Field type="text" name={`skills.${index}`} className="border rounded w-full py-2 px-3" />
                                                            <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Remove</button>
                                                            <ErrorMessage name={`skills.${index}`} component="div" className="text-red-600 ml-2" />
                                                        </div>
                                                    ))}
                                                    <button type="button" onClick={() => push('')} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">Add Skill</button>
                                                </div>
                                            )}
                                        </FieldArray>
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
            <ToastContainer />
        </div>

    );
};

export default CandidateProfileEdit;
