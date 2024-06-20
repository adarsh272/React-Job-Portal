// ApplyButton.jsx
import React, { useState, useContext } from 'react';
import { UserTypeContext } from '../context/UserTypeContext';
import { useNavigate } from 'react-router-dom';
import JobApplicationModal from './JobApplicationModal';
import JobApplicationForm from './JobApplicationForm';

const ApplyButton = ({ jobId }) => {
    const { userType } = useContext(UserTypeContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApply = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitApplication = (additionalInfo) => {
        console.log('Applied!')
        handleCloseModal()
    };

    return (
        <>
            <button onClick={handleApply} className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                Apply for this Job
            </button>
            <JobApplicationModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <JobApplicationForm onSubmit={handleSubmitApplication} />
            </JobApplicationModal>
        </>
    );
};

export default ApplyButton;
