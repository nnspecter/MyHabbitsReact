"use client"
import styles from "./HabitsSettings.module.scss"
import NewHabitButton from '@/features/SettingsButtons/NewHabbitButton'
import DeleteHabitButton from '@/features/SettingsButtons/DeleteHabitButton'
import HabitSettingsButton from '@/features/SettingsButtons/HabitSettingsButton'
import { Habit } from "@/entities/api/types/settings/allGroups"



const HabitsSettings = ({habits, groupId}:{habits: Habit[], groupId: number}) => {
  return (
    <div className={styles.habitsSettings}>
      <div className="medFont2">Настройки привычек</div>
      <div className={styles.habits}>
        {habits.map((habit) => (
          <div className={styles.habit} key={`habitssetting-${habit.id}`}>
            <div className="settingsTruncated smallFont2">{habit.name}</div> 
            
            <div className="settingsTypeTruncated smallFont2">{habit.type}</div>
            <HabitSettingsButton habit={habit} groupId={groupId}/>
            <div><DeleteHabitButton habitId={habit.id}/></div>
          </div>
        ))}
        <NewHabitButton groupId={groupId}/>
      </div>
    </div>
  )
}

export default HabitsSettings