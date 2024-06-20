import React from 'react'
import JobListing from '../../components/JobListing'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import useFetchJobsForCompany from '../../hooks/useFetchJobsForCompany'

const CompanyJobsPage = () => {
    const { user } = useContext(AuthContext);
    const { jobs, loading, error } = useFetchJobsForCompany(user.user.id);
    return (
        <div>
            <JobListing isHome={false} jobs={jobs} />
        </div>
    )
}

export default CompanyJobsPage