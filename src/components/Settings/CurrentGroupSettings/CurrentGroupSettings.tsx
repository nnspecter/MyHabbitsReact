"use client"
import  { useEffect } from 'react'
import styles from "./CurrentGroupSettings.module.scss"
import CurrentSettings from './CurrentSettings/CurrentSettings'
import HabitsSettings from './HabitSettings/HabitsSettings'
import { Button, CircularProgress } from '@mui/material'
import { useStore } from '@/shared/ZustandStore/store'
import { useAllGroups } from '@/shared/api/queries'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const CurrentGroupSettings = () => {
  const {selectedGroupId, setSelectedGroupId} = useStore();
  const {data, isPending} = useAllGroups();
  const group = data?.data.find(el => el.id === selectedGroupId);
  useEffect(()=>{
    if (!group) {
      setSelectedGroupId(null);
      
    };
  }, [group])
  
  
  if(isPending) { 
      return(
      <div className="tableLoading">
        <CircularProgress sx={{color: "#454545"}}/>
      </div>)
  }

  return (
    <div>
      { group ? <div className={styles.GroupSettings}>
        <div className={styles.row}>
          <Button
            onClick={() => setSelectedGroupId(null)}
            variant="contained"
            sx={{borderRadius: 2, padding: 0.5, minWidth: "30px", color: "var(--background)", backgroundColor: "var(--buttonColor)",}}
          ><ArrowBackIcon/>
          </Button>
          <div className="medFont2">Группа: {group.name}</div>
        </div>
        
          <CurrentSettings group={group}/>    
          <HabitsSettings habits={group.habits} groupId={group.id}/>
        </div>
        :
        <div className={styles.GroupSettings}> <div className="medFont1" style={{textAlign: "center"}}>Успешно удалено</div></div>}
    </div>
  )
}

export default CurrentGroupSettings