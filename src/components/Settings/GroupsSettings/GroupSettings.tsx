import React, { useEffect } from 'react'
import styles from "./GroupSettings.module.scss"
import { Button } from '@mui/material'
import { HabitsGroup } from '../../../api/api'
import { useStore } from '../../../ZustandStore/store'
import DeleteButton from '../../../features/SettingsButtons/DeleteButton'
import NewGroupButton from '../../../features/SettingsButtons/NewGroupButton'
import HiddenCheckbox from '../../../features/SettingsButtons/HiddenCheckbox'
import { ToGroupSettingsButton } from '../../../features/SettingsButtons/ToGroupSettingsButton'

interface GroupSettingsProps {
  groups: HabitsGroup[];
}

const GroupSettings:React.FC<GroupSettingsProps> = ({groups}) => {
  const [responsive, setResponsive] = React.useState(false);
  

  if(groups.length === 0){
    return (
      <div className={styles.GroupSettings}>
        <div className={styles.emptyGroups}>
          Группы отсутствуют
          <NewGroupButton/>
        </div>
        

      </div>
    )
  }

  return (
    <div className={styles.GroupSettings}>
      
        
        {groups.map((group, index) => (
            <div key= {`gsettings ${index}`} className={styles.group}>
                <div>
                     <div className='settingsTruncated smallFont2'>{group.name} </div>
                </div>
                <HiddenCheckbox id={group.id} hidden={Boolean(group.hidden)}></HiddenCheckbox>
                <ToGroupSettingsButton groupId={group.id} />

                <DeleteButton groupId={group.id}/>
            </div>
        ))}
        <NewGroupButton/>
    </div>

  )
}

export default GroupSettings