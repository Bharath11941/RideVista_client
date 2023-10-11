
import { Route, Routes } from 'react-router-dom'
import PartnerSignup from '../pages/partnerPages/partnerSignup'
import PartnerOtp from '../pages/partnerPages/PartnerOtp'
import PartnerLogin from '../pages/partnerPages/PartnerLogin'

const PartnerRoute = () => {
  return (
    <Routes>
      <Route path='/signup' element={<PartnerSignup/>}/>
      <Route path='/otp' element={<PartnerOtp/>}/>
      <Route path='/login' element={<PartnerLogin/>}/>
    </Routes>
  )
}

export default PartnerRoute