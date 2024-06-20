import React from 'react';

const JobApplicationModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-black">X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default JobApplicationModal
