import React from 'react'
import PartnerNavbar from '../../components/partnerComponents/PartnerNavbar'
import PartnerFooter from '../../components/partnerComponents/PartnerFooter'
import { PartnerCarousel } from '../../components/partnerComponents/PartnerHero'

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