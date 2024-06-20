import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import JobsPage from './pages/candidate/JobsPage';
import JobDetailsPage, { singleJobLoader } from './pages/candidate/JobDetailsPage';
import CompanyJobDetailsPage, { singleCompanyJobLoader } from './pages/company/CompanyJobDetailsPage';
import { useLoaderData } from 'react-router-dom';
import AddJobPage from './pages/company/AddJobPage';
import EditJobPage from './pages/company/EditJobPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { UserTypeProvider } from './context/UserTypeContext';
import CandidateLayout from './layouts/CandidateLayout';
import CandidateProfile from './pages/candidate/CandidateProfile';
import CandidateLandingPage from './pages/candidate/CandidateLandingPage'
import CompanyLayout from './layouts/CompanyLayout';
import CompanyLandingPage from './pages/company/CompanyLandingPage';
import CompanyProfile from './pages/company/CompanyProfile';
import CompanyJobsPage from './pages/company/CompanyJobsPage';
import { AuthContext } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useContext } from 'react';
import axios from './api/axios';


const App = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const submitJob = async (jobDetails, companyDetails) => {
    const jobInfo = { ...jobDetails, ...companyDetails };

    const response = await axios.post('/api/jobs/add', jobInfo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.status === 201) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add job');
    }

    return response;
  };

  const deleteJob = async (id) => {
    const res = await axios.delete(`/api/jobs/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return res
  }

  const editJob = async (jobDetails, companyDetails, id) => {
    const editInfo = { ...jobDetails, ...companyDetails }
    const token = localStorage.getItem('token');
    const response = await axios.put(`/api/jobs/edit/${id}`, editInfo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.status === 201) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to edit job');
    }

    return response;
  }
  const authRoutes = (
    <Route path='/auth' element={<AuthLayout />}>
      <Route path='login/:usertype' element={<LoginPage />} />
      <Route path='signup/:usertype' element={<SignupPage />} />
    </Route>
  );
  const candidateRoutes = (
    <Route path='/candidate-portal' element={<ProtectedRoutes userType={'candidate'} element={<CandidateLayout />} />}>
      <Route index element={<CandidateLandingPage />} />
      <Route path='profile' element={<CandidateProfile />} />
      <Route path='jobs' element={<JobsPage />} />
      <Route path='jobs/:id' element={<JobDetailsPage />} loader={singleJobLoader} />
      {/* <Route path='applications' element={<CandidateApplications />} /> */}
    </Route>
  );

  const companyRoutes = (
    <Route path='/company-portal' element={<ProtectedRoutes userType={'company'} element={<CompanyLayout />} />}>
      <Route index element={<CompanyLandingPage />} />
      <Route path='profile' element={<CompanyProfile />} />
      <Route path='jobs' element={<CompanyJobsPage />} />
      <Route path='jobs/:id' element={<CompanyJobDetailsPage deletejob={deleteJob} />} loader={singleCompanyJobLoader} />
      <Route path='edit-jobs/:id' element={<EditJobPage editjob={editJob} />} loader={singleCompanyJobLoader} />
      <Route path='add-job' element={<AddJobPage submitJob={submitJob} />} />
      {/* <Route path='applications' element={<CandidateApplications />} /> */}
    </Route>
  );
  //we create a Mainlayout and wrap it around our homepage. This way we can add any route (or page) under the MainLayout that needs to have the MainLayout component like Navbar and Footer
  //   The App.jsx component defines the routes using Routes and Route.
  // The MainLayout component is the parent route, with nested routes for HomePage and others.
  // The Outlet component in the MainLayout component acts as a placeholder. When the HomePage or other route is accessed, their components will be rendered in place of the Outlet.
  const appRoutes = (
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      {appRoutes}
      {authRoutes}
      {candidateRoutes}
      {companyRoutes}
    </>
  ));

  return (
    <UserTypeProvider>
      <RouterProvider router={router} />
    </UserTypeProvider>
  )
}

export default App