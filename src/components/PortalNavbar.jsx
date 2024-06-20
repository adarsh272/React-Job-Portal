import { React, useContext } from 'react'
import logo from '../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { UserTypeContext } from '../context/UserTypeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PortalNavbar = () => {
    const userType = localStorage.getItem('userType')
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const linkClass = ({ isActive }) => {
        return isActive ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
    }

    const logoutBtnClick = () => {
        const confirm = window.confirm('Are you sure you want to logout?')
        if (!confirm) return
        logout()
        navigate('/')
    }

    return (
        <nav className='bg-indigo-700 border-b border-indigo-500'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <img className='h-10 w-auto' src={logo} alt='React Jobs' />
                        <span className='hidden md:block text-white text-2xl font-bold ml-2 mt-4'>
                            React Jobs
                        </span>
                        {
                            userType == 'candidate' ? <div className="md:ml-auto">
                                <div className="flex space-x-2">
                                    <NavLink to="/candidate-portal" className={linkClass}>Home</NavLink>
                                    <NavLink to="/candidate-portal/jobs" className={linkClass}>All Jobs</NavLink>
                                    {/* <NavLink to="/add-job" className={linkClass}>My Applications</NavLink> */}
                                    <NavLink to="/candidate-portal/profile" className={linkClass}>My Profile</NavLink>
                                    <NavLink onClick={() => logoutBtnClick()} className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Log Out</NavLink>
                                </div>
                            </div> : <div className="md:ml-auto">
                                <div className="flex space-x-2">
                                    <NavLink to="/company-portal" className={linkClass}>Home</NavLink>
                                    <NavLink to="/company-portal/jobs" className={linkClass}>Posted Jobs</NavLink>
                                    <NavLink to="/company-portal/add-job" className={linkClass}>Add New Job</NavLink>
                                    <NavLink to="/company-portal/profile" className={linkClass}>Company Profile</NavLink>
                                    <NavLink onClick={() => logoutBtnClick()} className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Log Out</NavLink>
                                </div>
                            </div>
                        }


                    </div>
                </div>
            </div>
        </nav>
    )
}

export default PortalNavbar