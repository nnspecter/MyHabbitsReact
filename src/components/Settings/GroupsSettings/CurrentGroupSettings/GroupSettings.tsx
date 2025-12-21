import React from 'react'
import styles from "./GroupSettings.module.scss"
import CurrentSettings from './CurrentSettings/CurrentSettings'
import HabitsSettings from './HabitSettings/HabitsSettings'
const GroupSettings = ({group}) => {

  return (
    <div className={styles.GroupSettings}>
      <div className="medFont1">Выбранная группа: {group.name}</div>
        <CurrentSettings group={group}/>    
        <HabitsSettings habits={group.habits} groupId={group.id}/>
    </div>
  )
}

export default GroupSettings