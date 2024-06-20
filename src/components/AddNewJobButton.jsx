import React from 'react'
import { useNavigate } from 'react-router-dom';

const AddNewJobButton = () => {
    const navigate = useNavigate()
    const handleAddNewJobClick = () => {
        navigate('add-job')
    };
    return (
        <div>
            <section className="m-auto flex justify-center my-10 px-6">
                <button
                    onClick={handleAddNewJobClick}
                    className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >
                    Add New Job
                </button>
            </section>
        </div>
    )
}

export default AddNewJobButton