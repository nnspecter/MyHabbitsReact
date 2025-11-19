"use client"
import { useAllGroups, useHabbits, useSettingsConfig } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import SettingsPreview from '../../components/Settings/SettingsPreview'
import GroupSettings from '../../components/CurrentGroupSettings/GroupSettings'
import { useStore } from '../../ZustandStore/store'
import { use } from 'react'

const page = () => {
  
  const {data: habbitsQuery, isPending} = useHabbits();
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
  const {data: settingsConfigQuery, isPending: isPendingSettingsConfig} = useSettingsConfig();

  console.log("", allGroupsQuery);

  const {selectedGroupId} = useStore();
  const tableData = habbitsQuery?.data;
  const allGroups = allGroupsQuery?.data;
  console.log("data", allGroups);
  const group = allGroups?.find(el => el.id === selectedGroupId);


  console.log("GroupSettings group:", group);
  return ( 
    <div>
      {(isPending || isPendingAllGroups) && <div>Загрузка</div>}
      
      { !isPending && <HabbitsPreview currentHabbits={habbitsQuery.data}/> }
      { !isPendingAllGroups && <SettingsPreview currentGroups={allGroups}  settingsConfig={settingsConfigQuery}/> }
      
    </div>
  )
}

export default page