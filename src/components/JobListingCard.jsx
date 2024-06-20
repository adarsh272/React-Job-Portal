import React, { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserTypeContext } from '../context/UserTypeContext'

const JobListingCard = ({ job }) => {
    const { userType } = useContext(UserTypeContext);

    const [showFullDescription, setShowFullDescription] = useState(false)
    const navigate = useNavigate()

    const handleshowFullDescriptionButtonClick = () => {
        setShowFullDescription(!showFullDescription)
    }

    let description = job.description
    if (!showFullDescription) {
        description = job.description.substring(0, 90) + '...'
    } else {
        description = job.description
    }

    const openJobDetailsPage = (id) => {
        if (userType === 'candidate') {
            navigate(`/candidate-portal/jobs/${id}`);
        } else if (userType === 'company') {
            navigate(`/company-portal/jobs/${id}`);
        } else {
            // Default or fallback route if userType is not set
            navigate('/');
        }
    }

    return (
        <div class="bg-white rounded-xl shadow-md relative">
            <div class="p-4">
                <div class="mb-6">
                    <div class="text-gray-600 my-2">{job.type}</div>
                    <h3 class="text-xl font-bold">{job.title}</h3>
                </div>

                <div class="mb-1">
                    {description}
                </div>
                <button onClick={handleshowFullDescriptionButtonClick} className="text-indigo-500 hover:text-indigo-600 mb-5">{!showFullDescription ? 'Read more' : 'Read less'}</button>
                <h3 class="text-indigo-500 mb-2">{job.salary}</h3>

                <div class="border border-gray-100 mb-5"></div>

                <div class="flex flex-col lg:flex-row justify-between mb-4">
                    <div class="text-orange-700 mb-3">
                        <FaMapMarker class="inline mr-1" />
                        {job.location}
                    </div>
                    <button onClick={() => openJobDetailsPage(job._id)} class="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobListingCard