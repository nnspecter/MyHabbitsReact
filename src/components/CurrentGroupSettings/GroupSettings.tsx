import React from 'react'
import styles from "./GroupSettings.module.scss"
import CurrentSettings from './CurrentSettings/CurrentSettings'
import HabitsSettings from './HabitSettings/HabitsSettings'
import { useStore } from '../../ZustandStore/store'
const GroupSettings = ({group}) => {

  return (
    <div className={styles.GroupSettings}>
      <p className="medFont1">Превью настроек группы: {group.name}</p>
        <CurrentSettings group={group}/>    
        <HabitsSettings habits={group.habits} groupId={group.id}/>
    </div>
  )
}

export default GroupSettings