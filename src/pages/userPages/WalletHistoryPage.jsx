
import UserNavbar from '../../components/userComponents/userCommon/UserNavbar'
import UserFooter from '../../components/userComponents/userCommon/UserFooter'
import WalletHistorylist from '../../components/userComponents/profile/WalletHistorylist'
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
