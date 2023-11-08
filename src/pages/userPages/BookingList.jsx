import React from 'react'
import UserNavbar from '../../components/userComponents/UserNavbar'
import UserFooter from '../../components/userComponents/UserFooter'
import BookingListTable from '../../components/userComponents/BookingListTable'
import { useSelector } from 'react-redux'
import { myBookings } from '../../api/userApi'
import { cancelBookingUser } from '../../api/userApi'
const BookingList = () => {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <>
    <UserNavbar/>
    <BookingListTable id={user._id} BookingList={myBookings} cancelBooking={cancelBookingUser} role="user"/>
    <UserFooter/>
    </>
  )
}

export default BookingList