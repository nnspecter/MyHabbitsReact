"use client"
import Header from '../../components/Header/Header'
import SortableDashBoard from '../../components/DashBoard/SortableDashBoard'

const page = () => {
  
  return ( 
    <div className='headerDirection'>
      <Header/>
      <SortableDashBoard/>
    </div>
  )
}

export default page