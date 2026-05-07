import React from 'react'
import styles from "./SettingsPanel.module.scss"
import { useStore } from '@/entities/ZustandStore/store'
import HabitEditor from './HabitEditor/HabitEditor';
import GroupEditor from './GroupEditor/GroupEditor';
const SettingsPanel = () => {
    const {selectedGroupId, selectedHabitId} = useStore();
  return (
    <div className={styles.settingsPanel}>
        {selectedGroupId && <GroupEditor/>}
        {selectedHabitId && <HabitEditor habitId={selectedHabitId}/>}
    </div>
  )
}

export default SettingsPanel