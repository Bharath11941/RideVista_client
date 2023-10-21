import React from 'react'
import UserHero from '../../components/userComponents/UserHero'
import UserFooter from '../../components/userComponents/UserFooter'
import UserNavbar from '../../components/userComponents/UserNavbar'
import HomeCarCard from '../../components/userComponents/HomeCarCard'

const UserHome = () => {
  return (
    <>
    <UserNavbar/>
    <UserHero/>
    <HomeCarCard/>
    <UserFooter/>
    </>
  )
}

export default UserHome