import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import './App.css'
import UserRoute from './routes/UserRoute'
import { ToastContainer } from 'react-toastify'
import PartnerRoute from './routes/partnerRoute'
import AdminRoute from './routes/AdminRoute'

function App() {


  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
        <Route path='/partner/*' element={<PartnerRoute/>}/>
        <Route path='/admin/*' element={<AdminRoute/>}/>
      </Routes>
    </Router>
  )
}

export default App
