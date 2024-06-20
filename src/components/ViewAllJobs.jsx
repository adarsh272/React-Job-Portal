import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserTypeContext } from '../context/UserTypeContext';

const ViewAllJobs = () => {
    const { userType } = useContext(UserTypeContext);
    const navigate = useNavigate();

    const handleViewAllJobsClick = () => {
        if (userType === 'candidate') {
            navigate('/candidate-portal/jobs');
        } else if (userType === 'company') {
            navigate('/company-portal/jobs');
        } else {
            // Default or fallback route if userType is not set
            navigate('/');
        }
    };

    return (
        <section className="flex justify-center my-10 px-6">
            <button
                onClick={handleViewAllJobsClick}
                className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
            >
                View All Jobs
            </button>
        </section>
    );
};

export default ViewAllJobs;
