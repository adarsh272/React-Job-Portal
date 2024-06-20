import React from 'react'
import PortalNavbar from '../components/PortalNavbar'
import { Outlet } from 'react-router-dom'

const CompanyLayout = () => {
    return (
        <div>
            <PortalNavbar />
            <Outlet />
        </div>
    )
}

export default CompanyLayout