import React, { useEffect } from 'react'
import PartnerNavbar from '../../components/partnerComponents/PartnerNavbar'
import PartnerSidebar from '../../components/partnerComponents/dashboard/PartnerSidebar'
import { useLocation } from 'react-router-dom'
import ReviewListTable from '../../components/partnerComponents/dashboard/ReviewListTable'
import { getReviews } from '../../api/partnerApi'
import { useState } from 'react'

const ReviewsList = () => {
  const {state} = useLocation()
  const [carData,setCarData] = useState({})
  const {car} = state
  useEffect(()=>{
    getReviews(car._id).then((res)=>{
      console.log(res,"from useeff")
      setCarData(res?.data)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  return (
    <>
      <PartnerNavbar/>
      <PartnerSidebar/>
      <ReviewListTable car={carData}/>

    </>
  )
}

export default ReviewsList

