"use client"
import { useAllGroups, useHabbits, useSettingsConfig } from '../../api/queries'
import SettingsPreview from '../../components/Settings/SettingsPreview'
import { CircularProgress } from '@mui/material'
import Header from '../../components/Header/Header'

const page = () => {
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
  const {data: settingsConfigQuery, isPending: isPendingSettingsConfig} = useSettingsConfig();
  console.log(allGroupsQuery)

  const allGroups = allGroupsQuery?.data;


  return ( 
    <div className='headerDirection'>
      <Header/>
      {(isPendingAllGroups) && <div className="tableLoading"><CircularProgress/></div>}
      { (!isPendingAllGroups && !isPendingSettingsConfig) && <SettingsPreview currentGroups={allGroups}  settingsConfig={settingsConfigQuery?.data}/> }
      
      
    </div>
  )
}

export default page