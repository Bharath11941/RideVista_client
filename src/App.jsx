import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import './App.css'
import UserRoute from './routes/UserRoute'
import { ToastContainer } from 'react-toastify'
import PartnerRoute from './routes/partnerRoute'

function App() {


  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
        <Route path='/partner/*' element={<PartnerRoute/>}/>
      </Routes>
    </Router>
  )
}

export default App
