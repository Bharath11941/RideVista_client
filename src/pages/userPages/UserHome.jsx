import { useRef } from 'react'
import UserHero from '../../components/userComponents/Home/UserHero'
import UserFooter from '../../components/userComponents/userCommon/UserFooter'
import UserNavbar from '../../components/userComponents/userCommon/UserNavbar'
import RentingProcess from '../../components/userComponents/Home/RentingProcess'
import CarsForRental from '../../components/userComponents/Home/CarsForRental'
import DateLocationForm from '../../components/userComponents/Home/DateLocationForm'

const UserHome = () => {
  const dateRef = useRef()
  return (
    <>
    <UserNavbar/>
    <UserHero dateRef={dateRef}/>
    <DateLocationForm dateRef={dateRef}/>
    <RentingProcess/>
    <CarsForRental dateRef={dateRef}/>
    <UserFooter/>
    </>
  )
}

export default UserHome