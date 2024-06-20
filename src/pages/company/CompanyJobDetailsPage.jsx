import { React, useContext } from 'react'
import { useParams, useLoaderData, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserTypeContext } from '../../context/UserTypeContext'
import ApplyButton from '../../components/ApplyButton'
import axios from '../../api/axios'

const CompanyJobDetailsPage = ({ deletejob }) => {
    const { userType } = useContext(UserTypeContext);
    const navigate = useNavigate()
    const job = useLoaderData()

    const deleteAJob = async () => {
        const confirm = window.confirm('Are you sure you want to delete this lisitng?')
        if (!confirm) return
        const rest = await deletejob(job._id)
        toast.success(rest.data.message)
        navigate('/company-portal/jobs')
    }

    const handleEditButton = (id) => {
        navigate(`/company-portal/edit-jobs/${id}`)
    }

    const handleBackButtonClick = () => {
        if (userType === 'candidate') {
            navigate('/candidate-portal/jobs');
        } else if (userType === 'company') {
            navigate('/company-portal/jobs');
        } else {
            // Default or fallback route if userType is not set
            navigate('/');
        }
    };
    return (
        <>
            <section>
                <div class="container m-auto py-6 px-6">
                    <button onClick={handleBackButtonClick} class="text-indigo-500 hover:text-indigo-600 flex items-center">
                        <FaArrowLeft class="mr-2" /> Back to Job Listings
                    </button>
                </div>
            </section>

            <section class="bg-indigo-50">
                <div class="container m-auto py-10 px-6">
                    <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                <div class="text-gray-500 mb-4">{job.type}</div>
                                <h1 class="text-3xl font-bold mb-4">
                                    {job.title}
                                </h1>
                                <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                    <FaMapMarker class="fa-solid fa-location-dot text-lg text-orange-700 mr-2" />
                                    <p class="text-orange-700">{job.location}</p>
                                </div>
                            </div>

                            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 class="text-indigo-800 text-lg font-bold mb-6">
                                    Job Description
                                </h3>

                                <p class="mb-4">
                                    {job.description}
                                </p>

                                <h3 class="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                                <p class="mb-4">{job.salary}</p>
                            </div>
                        </main>

                        {/* <!-- Sidebar --> */}
                        <aside>
                            {/* <!-- Company Info --> */}
                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <h3 class="text-xl font-bold mb-6">Company Info</h3>

                                <h2 class="text-2xl">{job.companyName}</h2>

                                <p class="my-2">
                                    {job.companyDescription}
                                </p>

                                <hr class="my-4" />

                                <h3 class="text-xl">Contact Email:</h3>

                                <p class="my-2 bg-indigo-100 p-2 font-bold">
                                    {job.contactEmail}
                                </p>

                                <h3 class="text-xl">Contact Phone:</h3>

                                <p class="my-2 bg-indigo-100 p-2 font-bold">{job.contactPhone}</p>
                            </div>

                            {/* <!-- Manage --> */}
                            {userType == 'company' ?
                                <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                                    <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                                    <button onClick={() => handleEditButton(job._id)} class="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Edit Job</button>
                                    <button
                                        onClick={deleteAJob} class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >
                                        Delete Job
                                    </button>
                                </div> : (
                                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                                        <h3 class="text-xl font-bold mb-6">Interested?</h3>
                                        <ApplyButton jobId={job.id} class="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"></ApplyButton>
                                    </div>)
                            }

                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

const singleCompanyJobLoader = async ({ params }) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`/api/jobs/${params.id}`, {
            headers: {
                'Authorization': token
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching job:', error);
        throw error; // Optionally, you could handle the error more gracefully here
    }
};


export { CompanyJobDetailsPage as default, singleCompanyJobLoader }