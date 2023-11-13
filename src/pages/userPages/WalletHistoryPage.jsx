
import UserNavbar from '../../components/userComponents/UserNavbar'
import UserFooter from '../../components/userComponents/UserFooter'
import WalletHistorylist from '../../components/userComponents/WalletHistorylist'
import { useLocation } from 'react-router-dom'

const WalletHistoryPage = () => {
  const {state} = useLocation()
  console.log(state,"wallet history")

  return (
    <>
      <UserNavbar/>
      <WalletHistorylist user={state}/>
      <UserFooter/>
    </>
  )
}

export default WalletHistoryPage
