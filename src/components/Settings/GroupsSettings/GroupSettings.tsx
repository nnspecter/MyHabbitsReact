import React from 'react'
import styles from "./GroupSettings.module.scss"
import { Button } from '@mui/material'
import { useDeleteGroup } from '../../../api/mutations'
import DeleteResponsive from './Dialog/DeleteSurface'
import { HabbitsGroup } from '../../../api/api'
import GroupNameResponsive from './Dialog/InputSurface'

interface GroupSettingsProps {
  groups: HabbitsGroup[];
}

const GroupSettings:React.FC<GroupSettingsProps> = ({groups}) => {
  const [responsive, setResponsive] = React.useState(false);

  

  return (
    <div className={styles.GroupSettings}>
      <p className="medFont1">Настройки групп</p>
      
        {groups?.map((group, index) => (
            <div key= {`gsettings ${index}`} className={styles.group}>
                <div>
                     {group.name} 
                </div>
                <Button variant="contained">Скрыть</Button>
                <Button variant="contained">Настройки</Button>
                <DeleteResponsive groupId={group.id}/>
                
            </div>
        ))}

        <GroupNameResponsive/>
    </div>

  )
}

export default GroupSettings