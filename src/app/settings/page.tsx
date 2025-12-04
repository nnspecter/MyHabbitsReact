"use client"
import { useAllGroups, useHabbits, useSettingsConfig } from '../../api/queries'
import SettingsPreview from '../../components/Settings/SettingsPreview'
import GroupSettings from '../../components/CurrentGroupSettings/GroupSettings'
import { useStore } from '../../ZustandStore/store'
import { CircularProgress } from '@mui/material'
import Header from '../../components/Header/Header'

const page = () => {
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
  const {data: settingsConfigQuery, isPending: isPendingSettingsConfig} = useSettingsConfig();


  const {selectedGroupId} = useStore();
  const allGroups = allGroupsQuery?.data;
  const group = allGroups?.find(el => el.id === selectedGroupId);


  return ( 
    <div>
      <Header/>
      {(isPendingAllGroups) && <div className="tableLoading"><CircularProgress/></div>}
      { (!isPendingAllGroups && !isPendingSettingsConfig) && <SettingsPreview currentGroups={allGroups}  settingsConfig={settingsConfigQuery?.data}/> }
      { selectedGroupId && group && <GroupSettings group={group}/> }
      
    </div>
  )
}

export default page