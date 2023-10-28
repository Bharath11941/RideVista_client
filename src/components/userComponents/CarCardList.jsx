import  { useEffect, useState } from "react"
import { allCarList } from "../../api/userApi"
import CarCard from "./CarCard"
import Loading from "../loading/Loading"

const CarCardList = () => {
  const [loading , setLoading] = useState(false)
  const [cars,setCars] = useState([])
  useEffect(()=>{
    setLoading(true)
    allCarList().then((res)=>{
      setCars(res?.data?.cars)
      setLoading(false)
    }).catch((err)=>{
      setLoading(false)
      console.log(err.message)
    })
  },[])
  console.log(cars)
  return (
    <>
    {/* {loading ? (
      <div className="fixed inset-0 flex items-center justify-center">
          <div className="spinnerouter">
            <Loading />
          </div>
        </div>
    ):( */}
      <div className='pt-30'>
      <h1 className="text-3xl font-bold tracking-tight pl-20 pt-5 pb-5 text-gray-900">New Arrivals</h1>
      <div className="flex flex-col flex-wrap md:mx-20 md:flex-row gap-5 md:gap-10 pb-6">
        {cars.map((car)=>(
          <CarCard key={car._id} car={car}/>
        ))}
      </div>
    </div>
    {/* )} */}
    </>
    
  )
}

export default CarCardList