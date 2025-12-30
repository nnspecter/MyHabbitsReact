"use client"
import { useHabbits} from '../../api/queries'
import { CircularProgress } from '@mui/material'
import Header from '../../components/Header/Header'
import SortableDashBoard from '../../components/DashBoard/SortableDashBoard'

const page = () => {
  const {data: habbitsQuery, isPending} = useHabbits({startDate: "2025-10-01", endDate: "2025-11-10"});
  


  return ( 
    <div>
      <Header/>
      {(isPending ) && <div className="tableLoading"><CircularProgress/></div>}
      {!isPending && <SortableDashBoard/>}
    </div>
  )
}

export default page