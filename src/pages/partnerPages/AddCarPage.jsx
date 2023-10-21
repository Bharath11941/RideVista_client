import React from 'react'
import PartnerNavbar from '../../components/partnerComponents/PartnerNavbar'
import PartnerSidebar from '../../components/partnerComponents/dashboard/PartnerSidebar'
import AddCar from '../../components/partnerComponents/dashboard/AddCarForm'

const AddCarPage = () => {
  return (
    <>
    <PartnerNavbar/>
    <PartnerSidebar/>
    <AddCar/>
    </>
  )
}

export default AddCarPage