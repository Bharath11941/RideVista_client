
import { Route, Routes } from 'react-router-dom'
import PartnerSignup from '../pages/partnerPages/partnerSignup'
import PartnerOtp from '../pages/partnerPages/PartnerOtp'
import PartnerLogin from '../pages/partnerPages/PartnerLogin'
import PartnerPublic from './partnerPrivate/PartnerPublic'
import PartnerProtect from './partnerPrivate/PartnerProtect'
import PartnerHome from '../pages/partnerPages/PartnerHome'
import PartnerDashboard from '../pages/partnerPages/PartnerDashboard'
import AddCarPage from '../pages/partnerPages/AddCarPage'
import MyCarsPage from '../pages/partnerPages/MyCarsPage'
import PartnerForgetPass from '../pages/partnerPages/PartnerForgetPass'
import PartnerEditCarPage from '../pages/partnerPages/PartnerEditCarPage'
import PartnerResetPassword from '../pages/partnerPages/PartnerResetPasswword'
import PageNotFound from '../components/error/PageNotFound'
import BookingListPartner from '../pages/partnerPages/BookingListPartner'
import BookingDetailsPartner from '../pages/partnerPages/BookingDetailsPartner'
import ReviewsList from '../pages/partnerPages/ReviewsList'
import CancelRequestPage from '../pages/partnerPages/CancelRequestPage'
import Error500 from '../components/error/500'
import ChatPage from '../pages/partnerPages/ChatPage'
import PartnerProfile from '../pages/partnerPages/PartnerProfile'
const PartnerRoute = () => {
  return (
    <Routes>
      <Route path='/signup' element={<PartnerPublic><PartnerSignup/></PartnerPublic>}/>
      <Route path='/otp' element={<PartnerPublic><PartnerOtp/></PartnerPublic>}/>
      <Route path='/login' element={<PartnerPublic><PartnerLogin/></PartnerPublic>}/>
      <Route path='/partnerForget' element={<PartnerPublic><PartnerForgetPass/></PartnerPublic>}/>
      <Route path='/partnerReset/:id/:token' element={<PartnerPublic><PartnerResetPassword/></PartnerPublic>}/>
      <Route path='/' element={<PartnerProtect><PartnerHome/></PartnerProtect>}/>
      <Route path='/dashboard' element={<PartnerProtect><PartnerDashboard/></PartnerProtect>}/>
      <Route path='/addCar' element={<PartnerProtect><AddCarPage/></PartnerProtect>}/>
      <Route path='/myCars' element={<PartnerProtect><MyCarsPage/></PartnerProtect>}/>
      <Route path='/editCar/:carId' element={<PartnerProtect><PartnerEditCarPage/></PartnerProtect>}/>
      <Route path='/bookings' element={<PartnerProtect><BookingListPartner/></PartnerProtect>}/>
      <Route path='/bookingDetails' element={<PartnerProtect><BookingDetailsPartner/></PartnerProtect>}/>
      <Route path='/reviews' element={<PartnerProtect><ReviewsList/></PartnerProtect>}/>
      <Route path='/cancelRequests' element={<PartnerProtect><CancelRequestPage/></PartnerProtect>}/>
      <Route path='/chat' element={<PartnerProtect><ChatPage/></PartnerProtect>}/>
      <Route path='/profile' element={<PartnerProtect><PartnerProfile/></PartnerProtect>}/>
      <Route path="/pageNotFound" element={<PageNotFound />} />
      <Route path="/error-500" element={<Error500 />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default PartnerRoute