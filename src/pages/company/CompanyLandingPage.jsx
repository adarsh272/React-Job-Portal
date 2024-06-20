import React from 'react'
import Hero from '../../components/Hero'
import JobListing from '../../components/JobListing'
import ViewAllJobs from '../../components/ViewAllJobs'
import AddNewJobButton from '../../components/AddNewJobButton'
import useFetchJobsForCompany from '../../hooks/useFetchJobsForCompany'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import NoJobsAvailable from '../../components/NoJobsAvailable'

const CompanyLandingPage = () => {

    const { user } = useContext(AuthContext);
    const { jobs, loading, error } = useFetchJobsForCompany(user.user.id);

    return (
        <div>
            <Hero title="Find the right candidate!" subtitle="Post a vacancy and find your ideal client" />
            {jobs.length > 0 ?
                <div>
                    <JobListing isHome={true} jobs={jobs} />
                    {/* add a section here that will show all the applicants that recently applied for jobs to this company */}
                    <div className='flex justify-center'>
                        <ViewAllJobs />
                    </div>
                </div> :
                <div>
                    <NoJobsAvailable></NoJobsAvailable>
                    <AddNewJobButton />
                </div>
            }


        </div>
    )
}

export default CompanyLandingPage