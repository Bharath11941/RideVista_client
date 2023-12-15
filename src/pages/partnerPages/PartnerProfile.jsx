import React from 'react'
import PartnerNavbar from '../../components/partnerComponents/partnerCommon/PartnerNavbar'
import ProfileCard from '../../components/partnerComponents/profile/ProfileCard'
import PartnerFooter from "../../components/partnerComponents/partnerCommon/PartnerFooter";
const PartnerProfile = () => {
  return (
    <>
      <PartnerNavbar/>
      <ProfileCard/>
      <PartnerFooter/>
    </>
  )
}

export default PartnerProfile
