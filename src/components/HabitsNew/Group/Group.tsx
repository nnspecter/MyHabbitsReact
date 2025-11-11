import styles from "./Group.module.scss"
import CustomTable from './Table/Table'
import { Switch } from '@mui/material'
import { useStore } from '../../../ZustandStore/store'
import { useEffect } from "react"
const Group = ({group}) => {
  const {setMode, mods} = useStore();

  const handleChange = (event) => {
    setMode(group.id, event.target.checked);
    console.log(mods);
  }
  
  return (
    <div className={styles.group}>
      <div className={styles.groupName}>
        <div className={styles.name}>
          <div className={styles.color} style={{backgroundColor: group.color}}></div>
          <div className="medFont1"> Группа: {group.name}</div>
        </div>
        <div className={styles.switch}>
            Редактирование: <Switch onChange={(e)=> handleChange(e)}></Switch>
        </div>
      </div>
      
      {
       <CustomTable habits={group.habits}/> 
      }
      {/* {
        group.habits.map((el, key) => (
          <SoloHabit habit ={el} key={`solo-${key}`}/>
        ))
      } */}
    </div>
  )
}

export default Group