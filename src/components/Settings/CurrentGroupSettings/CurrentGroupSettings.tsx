import React from 'react'
import styles from "./CurrentGroupSettings.module.scss"
import CurrentSettings from './CurrentSettings/CurrentSettings'
import HabitsSettings from './HabitSettings/HabitsSettings'
import { Button, CircularProgress } from '@mui/material'
import { useStore } from '../../../ZustandStore/store'
import { useAllGroups } from '../../../api/queries'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MountAnimation } from '../../../animations/MountAnimation'

const CurrentGroupSettings = () => {
  const {selectedGroupId, setSelectedGroupId} = useStore();
  const {data, isPending} = useAllGroups();
  const group = data?.data.find(el => el.id === selectedGroupId);
  
  if (!group) {
    setSelectedGroupId(null);
    return <div>Group not found</div>
  };
  
  if(isPending) { 
      return(
      <div className="tableLoading">
        <CircularProgress sx={{color: "#454545"}}/>
      </div>)
  }

  return (
    <div className={styles.GroupSettings}>
      <div className={styles.row}>
        <Button
          onClick={() => setSelectedGroupId(null)}
          variant="contained"
          sx={{padding: 0, minWidth: "30px", color: "#D9D9D9", backgroundColor: "#454545",}}
        ><ArrowBackIcon/>
        </Button>
        <div className="medFont2">Группа: {group.name}</div>
      </div>
      
        <CurrentSettings group={group}/>    
        <HabitsSettings habits={group.habits} groupId={group.id}/>
    </div> 
  )
}

export default CurrentGroupSettings