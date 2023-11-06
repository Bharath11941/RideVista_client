import React from 'react'
import UserHero from '../../components/userComponents/UserHero'
import UserFooter from '../../components/userComponents/UserFooter'
import UserNavbar from '../../components/userComponents/UserNavbar'
import RentingProcess from '../../components/userComponents/Home/RentingProcess'
import CarsForRental from '../../components/userComponents/Home/CarsForRental'
import DateLocationForm from '../../components/userComponents/DateLocationForm'

const UserHome = () => {
  return (
    <>
    <UserNavbar/>
    <UserHero/>
    <DateLocationForm/>
    <RentingProcess/>
    <CarsForRental/>
    <UserFooter/>
    </>
  )
}

export default UserHome