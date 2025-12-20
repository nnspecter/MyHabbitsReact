"use client"
import { useHabbits} from '../../api/queries'
import DashBoard from '../../components/DashBoard/DashBoardNew'
import { CircularProgress } from '@mui/material'
import Header from '../../components/Header/Header'

const page = () => {
  const {data: habbitsQuery, isPending} = useHabbits({startDate: "2025-10-01", endDate: "2025-11-10"});
  


  return ( 
    <div>
      <Header/>
      {(isPending ) && <div className="tableLoading"><CircularProgress/></div>}
      {!isPending && <DashBoard/>}
    </div>
  )
}

export default page