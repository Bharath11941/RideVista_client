import React from 'react'
import PartnerSidebar from '../../components/partnerComponents/dashboard/PartnerSidebar'
import PartnerNavbar from '../../components/partnerComponents/PartnerNavbar'
import Mycars from '../../components/partnerComponents/dashboard/Mycars'
const MyCarsPage = () => {
  return (
    <>
    <PartnerNavbar/>
    <PartnerSidebar/>
    <Mycars/>
    </>
  )
}

export default MyCarsPage