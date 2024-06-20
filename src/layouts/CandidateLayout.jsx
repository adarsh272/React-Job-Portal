import React from 'react'
import PortalNavbar from '../components/PortalNavbar'
import { Outlet } from 'react-router-dom'

const CandidateLayout = () => {
    return (
        <div>
            <PortalNavbar />
            <Outlet />
        </div>
    )
}

export default CandidateLayout