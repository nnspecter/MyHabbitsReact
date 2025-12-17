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
  
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();

  return ( 
    <div>
      <Header/>
      <HabbitsPreview/>
    </div>
  )
}

export default page