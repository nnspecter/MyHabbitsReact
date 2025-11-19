import React from 'react'
import styles from "./Settings.module.scss"
import MainSettings from './MainSettings/MainSettings'
import GroupSettings from './GroupsSettings/GroupSettings'
const SettingsPreview = ({currentGroups, settingsConfig}) => {
  
  return (
    <div className={styles.settings}>
         <p className="medFont1">Превью настроек</p>
        <MainSettings settings={settingsConfig}/>
        <GroupSettings groups={currentGroups} />
    </div>
  )
}

export default SettingsPreview