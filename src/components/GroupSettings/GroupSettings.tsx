import React from 'react'
import styles from "./GroupSettings.module.scss"
import CurrentSettings from './CurrentSettings/CurrentSettings'
import HabitSettings from './HabitSettings/HabitSettings'
const GroupSettings = () => {
    
  return (
    <div className={styles.GroupSettings}>
        <CurrentSettings/>    
        <HabitSettings/>
    </div>
  )
}

export default GroupSettings