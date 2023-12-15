import CarDetails from "../../components/userComponents/car/CarDetails"
import RatingList from "../../components/userComponents/rating/RatingList"
import UserFooter from "../../components/userComponents/userCommon/UserFooter"
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar"

const SingleCarDetails = () => {
  return (
    <>
    <UserNavbar/>
    <CarDetails/>
    <RatingList/>
    
    <UserFooter/>
    
    </>
  )
}

export default SingleCarDetails