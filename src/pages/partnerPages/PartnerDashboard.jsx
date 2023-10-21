import React from 'react'
import PartnerSidebar from '../../components/partnerComponents/dashboard/PartnerSidebar'
import PartnerNavbar from '../../components/partnerComponents/PartnerNavbar'
import DashboardHome from '../../components/partnerComponents/dashboard/DashboardHome'

const PartnerDashboard = () => {
  return (
    <>
    <PartnerNavbar/>
    <PartnerSidebar/>
    <DashboardHome/>
    </>
  )
}

export default PartnerDashboard