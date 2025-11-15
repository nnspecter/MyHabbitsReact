"use client"
import { useAllGroups, useHabbits } from '../../api/queries'
import HabbitsPreview from '../../components/HabitsNew/HabbitsPreview'
import SettingsPreview from '../../components/Settings/SettingsPreview'
import GroupSettings from '../../components/CurrentGroupSettings/GroupSettings'
import { useStore } from '../../ZustandStore/store'

const page = () => {
  
  const {data: habbitsQuery, isPending} = useHabbits();
  const allGroupsQuery = useAllGroups();

  const {selectedGroupId} = useStore();
  const data = habbitsQuery?.data;
  const group = data?.groups?.find(el => el.id === selectedGroupId);

  return ( 
    <div>
      {isPending && <div>Загрузка</div>}
      
      { data && <HabbitsPreview CurrentHabbits={habbitsQuery.data}/> }
      { data && <SettingsPreview CurrentHabbits={habbitsQuery.data}/> }
      { group && <GroupSettings group={group}/> }
      

    </div>
  )
}

export default page