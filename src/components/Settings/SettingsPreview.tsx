import styles from "./Settings.module.scss"
import MainSettings from './MainSettings/MainSettings'
import GroupSettings from './GroupsSettings/GroupSettings'
const SettingsPreview = ({currentGroups, settingsConfig}) => {
  
  return (
    <div className={styles.settingsPreview}>
      <div className={styles.settings}>
          <div className={`medFont2 ${styles.title}`}>Настройки</div>
          <MainSettings settings={settingsConfig}/>
      </div>
      <div className={styles.settings}>
        <div className={`medFont2 ${styles.title}`}>Настройки групп</div>
          <GroupSettings groups={currentGroups} />
      </div>
    </div>

  )
}

export default SettingsPreview