import React, { useState } from 'react';
import * as Yup from 'yup'

const JobApplicationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        joinDate: '',
        experienceYears: '',
        additionalComments: '',
    });

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object({
        joinDate: Yup.date().required("Please enter your tentative joining date"),
        experienceYears: Yup.number()
            .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
            .required("Please enter your relevant years of work exp.")
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newErrors = {};

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors([]);
            console.log("Form Submitted", formData);
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
        <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Job Application Form</h2>

            <div>
                <label className="block text-gray-700 font-bold mb-2">When can you join?*</label>
                <input className="border rounded w-full py-2 px-3 mb-8" type="date" name="joinDate" placeholder="DD-MM-YY" value={formData.joinDate} onChange={handleChange} />
            </div>
            {errors.joinDate && <div className="error">{errors.joinDate}</div>}
            <div>
                <label className="block text-gray-700 font-bold mb-2">Years of Experience*</label>
                <input className="border rounded w-full py-2 px-3 mb-8" type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} />
            </div>
            {errors.experienceYears && <div className="error">{errors.experienceYears}</div>}
            <div>
                <label className="block text-gray-700 font-bold mb-2">Anything else you would like us to know?</label>
                <textarea className="border rounded w-full py-2 px-3 mb-8" name="additionalComments" value={formData.additionalComments} onChange={handleChange} />
            </div>
            <div>
                <button className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block' type="submit">Submit Application</button>
            </div>
        </form>
    );
};

export default JobApplicationForm;
