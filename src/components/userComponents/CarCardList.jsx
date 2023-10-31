import  { useEffect, useState } from "react"
import { allCarList } from "../../api/userApi"
import CarCard from "./CarCard"

const CarCardList = () => {
  const [cars,setCars] = useState([])
  useEffect(()=>{
    allCarList().then((res)=>{
      setCars(res?.data?.cars)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])
  return (
    <>
        {cars.map((car)=>(
          <CarCard key={car._id} car={car}/>
        ))}

    </>
    
  )
}

export default CarCardList