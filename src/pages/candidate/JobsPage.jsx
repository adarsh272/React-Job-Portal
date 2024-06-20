import React from 'react'
import JobListing from '../../components/JobListing'
import useFetchJobs from '../../hooks/useFetchJobs';
import NoJobsAvailable from '../../components/NoJobsAvailable';
import Spinner from '../../components/Spinner';

const JobsPage = () => {
    const { jobs, loading, error } = useFetchJobs();

    return (
        <div>
            <Spinner loading={loading} />
            {!loading && (jobs.length > 0 ? <JobListing isHome={false} jobs={jobs} loading={loading} error={error} /> : <NoJobsAvailable userType="candidate" />)}
        </div>

    )
}

export default JobsPage