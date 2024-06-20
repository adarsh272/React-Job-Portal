import React from 'react'
import Hero from '../../components/Hero'
import JobListing from '../../components/JobListing'
import ViewAllJobs from '../../components/ViewAllJobs'
import useFetchJobs from '../../hooks/useFetchJobs'
import NoJobsAvailable from '../../components/NoJobsAvailable'
import Spinner from '../../components/Spinner'

const CandidateLandingPage = () => {
    const { jobs, loading, error } = useFetchJobs(3);

    return (
        <div>
            <Hero title="Land Your Dream Job With Us!" subtitle="A centralized hub for react jobs worldwide." jobs={jobs} loading={loading} error={error} />
            <Spinner loading={loading} />
            {
                !loading && (jobs.length > 0 ?
                    <div>
                        <JobListing isHome={true} jobs={jobs} />
                        <ViewAllJobs />
                    </div> :
                    <NoJobsAvailable userType="candidate" />)
            }

        </div>
    )
}

export default CandidateLandingPage