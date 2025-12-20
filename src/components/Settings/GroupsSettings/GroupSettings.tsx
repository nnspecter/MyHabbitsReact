import React, { useEffect } from 'react'
import styles from "./GroupSettings.module.scss"
import { Button } from '@mui/material'
import { HabitsGroup } from '../../../api/api'
import { useStore } from '../../../ZustandStore/store'
import DeleteButton from '../../../features/SettingsButtons/DeleteButton'
import NewGroupButton from '../../../features/SettingsButtons/NewGroupButton'
import HiddenCheckbox from '../../../features/SettingsButtons/HiddenCheckbox'

interface GroupSettingsProps {
  groups: HabitsGroup[];
}

const GroupSettings:React.FC<GroupSettingsProps> = ({groups}) => {
  const [responsive, setResponsive] = React.useState(false);
  const{selectedGroupId, setSelectedGroupId} = useStore();
  useEffect(()=>{
    
  }, [selectedGroupId])

  return (
    <div className={styles.GroupSettings}>
      <div className="medFont1">Настройки групп</div>
      
        {groups.map((group, index) => (
            <div key= {`gsettings ${index}`} className={styles.group}>
                <div>
                     {group.name} 
                </div>
                <HiddenCheckbox id={group.id} hidden={Boolean(group.hidden)}></HiddenCheckbox>
                <Button 
                  variant="contained"
                  onClick={() => setSelectedGroupId(group.id)} sx={{background: "#454545"}}
                  style={{ fontSize: "10pt", fontWeight: "bold", borderRadius: "10px"}}
                >
                  Настроить
                </Button>

                <DeleteButton groupId={group.id}/>
            </div>
        ))}
        <NewGroupButton/>
    </div>

  )
}

export default GroupSettings