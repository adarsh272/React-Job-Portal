import React, { useState, useEffect, useContext } from 'react'
import JobListingCard from './JobListingCard'
import { UserTypeContext } from '../context/UserTypeContext'

const JobListing = ({ isHome, jobs, loading, error }) => {
    const { userType } = useContext(UserTypeContext)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading jobs: {error.message}</p>;

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {userType == 'candidate' ? 'Browse Jobs' : 'Jobs posted by you'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs?.length > 0 ? jobs.map((job) => (
                        <JobListingCard key={job.id} job={job} />
                    )) : <h5>No jobs available</h5>}
                </div>
            </div>
        </section>
    )
}

export default JobListing