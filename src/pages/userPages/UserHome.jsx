import React, { useRef } from 'react'
import UserHero from '../../components/userComponents/UserHero'
import UserFooter from '../../components/userComponents/UserFooter'
import UserNavbar from '../../components/userComponents/UserNavbar'
import RentingProcess from '../../components/userComponents/Home/RentingProcess'
import CarsForRental from '../../components/userComponents/Home/CarsForRental'
import DateLocationForm from '../../components/userComponents/DateLocationForm'

const UserHome = () => {
  const dateRef = useRef()
  return (
    <>
    <UserNavbar/>
    <UserHero/>
    <DateLocationForm dateRef={dateRef}/>
    <RentingProcess/>
    <CarsForRental dateRef={dateRef}/>
    <UserFooter/>
    </>
  )
}

export default UserHome