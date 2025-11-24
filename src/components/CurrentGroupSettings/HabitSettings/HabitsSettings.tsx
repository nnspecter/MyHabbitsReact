import React from 'react'
import styles from "./HabitsSettings.module.scss"
import NewHabitButton from '../../../features/SettingsButtons/NewHabbitButton'
import DeleteHabitButton from '../../../features/SettingsButtons/DeleteHabitButton'
const HabitsSettings = ({habits, groupId}) => {
  return (
    <div className={styles.habitsSettings}>
      <div className="medFont1">Настройки привычек</div>
      <div className={styles.habits}>
        {habits.map((habit, index) => (
          <div className={styles.habit} key={`habitssetting ${index}`}>
            {habit.name} 
            <div><DeleteHabitButton habitId={habit.id}/></div>
          </div>
        ))}
        <NewHabitButton groupId={groupId}/>
      </div>
    </div>
  )
}

export default HabitsSettings