import styles from "./Settings.module.scss"
import MainSettings from './MainSettings/MainSettings'
import GroupSettings from './GroupsSettings/GroupSettings'
const SettingsPreview = ({currentGroups, settingsConfig}) => {
  
  return (
    <div className={styles.settings}>
         <div className="medFont2">Настройки</div>
        <MainSettings settings={settingsConfig}/>
        <GroupSettings groups={currentGroups} />
    </div>
  )
}

export default SettingsPreview