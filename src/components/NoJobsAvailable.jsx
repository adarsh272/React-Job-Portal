import React from 'react'

const NoJobsAvailable = ({ userType }) => {
    return (
        <div className='text-center'>
            <h2 className="text-3xl font-bold text-indigo-500 mt-8">{userType == 'candidate' ? "No Jobs Available Right Now" : 'You have not added any Jobs yet'}</h2>
            <div className='my-4 text-xl'>{userType == 'candidate' ? 'Please check after some time' : 'Add a new job and find the right candidate'}</div>
        </div>
    )
}

export default NoJobsAvailable