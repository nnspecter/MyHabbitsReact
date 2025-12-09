"use client"
import { useAllGroups, useHabbits, useSettingsConfig } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import SettingsPreview from '../../components/Settings/SettingsPreview'
import GroupSettings from '../../components/CurrentGroupSettings/GroupSettings'
import DashBoard from '../../components/DashBoard/DashBoardNew'
import { CircularProgress } from '@mui/material'
import Header from '../../components/Header/Header'
import { useStore } from '../../ZustandStore/store'

const page = () => {
  const {dateRange}=useStore();

  const {data: habbitsQuery, isPending} = useHabbits({startDate: dateRange.startDate, endDate: dateRange.endDate});
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();

  return ( 
    <div>
      <Header/>
      {(isPending || isPendingAllGroups) && <div className="tableLoading"><CircularProgress/></div>}
      {!isPending && <HabbitsPreview currentHabbits={habbitsQuery.data} isPending={isPending}/> }
      
      
    </div>
  )
}

export default page