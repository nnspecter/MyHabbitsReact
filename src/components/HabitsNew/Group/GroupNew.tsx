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