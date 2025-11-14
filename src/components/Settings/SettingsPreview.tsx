import React from 'react'
import styles from "./Settings.module.scss"
import MainSettings from './MainSettings/MainSettings'
import GroupSettings from './GroupsSettings/GroupSettings'
const SettingsPreview = ({CurrentHabbits}) => {
  if (!CurrentHabbits) return <div>Loading...</div>;
  return (
    <div className={styles.settings}>
         <p className="medFont1">Превью настроек</p>
        <MainSettings/>
        <GroupSettings groups={CurrentHabbits.groups}/>
    </div>
  )
}

export default SettingsPreview