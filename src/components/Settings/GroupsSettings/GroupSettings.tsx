import React from 'react'
import styles from "./GroupSettings.module.scss"
import { Button } from '@mui/material'
import { HabbitsGroup } from '../../../api/api'
import { useStore } from '../../../ZustandStore/store'
import DeleteButton from '../../../features/SettingsButtons/DeleteButton'
import NewGroupButton from '../../../features/SettingsButtons/NewGroupButton'

interface GroupSettingsProps {
  groups: HabbitsGroup[];
}

const GroupSettings:React.FC<GroupSettingsProps> = ({groups}) => {
  const [responsive, setResponsive] = React.useState(false);
  const{selectedGroupId, setSelectedGroupId} = useStore();
  

  return (
    <div className={styles.GroupSettings}>
      <p className="medFont1">Настройки групп</p>
      
        {groups?.map((group, index) => (
            <div key= {`gsettings ${index}`} className={styles.group}>
                <div>
                     {group.name} 
                </div>
                <Button variant="contained">Скрыть</Button>
                <Button variant="contained" onClick={() => setSelectedGroupId(group.id)}>Настройки</Button>
                <DeleteButton groupId={group.id}/>
                
            </div>
        ))}

        <NewGroupButton/>
    </div>

  )
}

export default GroupSettings