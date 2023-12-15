import React from 'react'
import PartnerNavbar from '../../components/partnerComponents/partnerCommon/PartnerNavbar'
import PartnerFooter from '../../components/partnerComponents/partnerCommon/PartnerFooter'
import { PartnerCarousel } from '../../components/partnerComponents/home/PartnerHero'

const PartnerHome = () => {
  return (
    <>
    <PartnerNavbar/>
    <PartnerCarousel/>
    <PartnerFooter/>
    </>
  )
}

export default PartnerHome