
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/adminPages/AdminLogin'
import AdminPublic from './adminPrivate/AdminPublic'
import AdminProtect from './adminPrivate/AdminProtect'
import AdminDashboard from '../pages/adminPages/AdminDashboard'
import UserListPage from '../pages/adminPages/UserListPage'
import PartnerListPage from '../pages/adminPages/PartnerListPage'
import PageNotFound from '../components/error/PageNotFound'
import CarListPage from '../pages/adminPages/CarListPage'
import CarDetailPage from '../pages/adminPages/CarDetailPage'

const AdminRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<AdminPublic><AdminLogin/></AdminPublic>}/>
      <Route path='/dashboard' element={<AdminProtect><AdminDashboard/></AdminProtect>}/>
      <Route path='/userList' element={<AdminProtect><UserListPage/></AdminProtect>}/>
      <Route path='/partnerList' element={<AdminProtect><PartnerListPage/></AdminProtect>}/>
      <Route path='/carList' element={<AdminProtect><CarListPage/></AdminProtect>}/>
      <Route path='/carDetails/:carId' element={<AdminProtect><CarDetailPage/></AdminProtect>}/>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/pageNotFound" element={<PageNotFound />} />
    </Routes>
  )
}

export default AdminRoute