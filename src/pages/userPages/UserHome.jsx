import React from 'react'
import UserHero from '../../components/userComponents/UserHero'
import UserFooter from '../../components/userComponents/UserFooter'
import UserNavbar from '../../components/userComponents/UserNavbar'
import RentingProcess from '../../components/userComponents/RentingProcess'
import CarsForRental from '../../components/userComponents/CarsForRental'

const UserHome = () => {
  return (
    <>
    <UserNavbar/>
    <UserHero/>
    <RentingProcess/>
    {/* <HomeCarCard/> */}
    <CarsForRental/>
    <UserFooter/>
    </>
  )
}

export default UserHome