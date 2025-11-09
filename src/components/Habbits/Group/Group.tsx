import React from 'react'
import styles from "./Group.module.scss"
import SoloHabit from './SoloHabit/SoloHabit'
import CustomTable from './Table'
const Group = ({group}) => {
  return (
    
    <div className={styles.group}>
      <div className={styles.groupName}>
        <div className={styles.color} style={{backgroundColor: group.color}}></div>
        <div className="medFont1"> Группа: {group.name}</div>
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