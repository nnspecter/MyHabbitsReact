import styles from "./Settings.module.scss"
import MainSettings from './MainSettings/MainSettings'
import GroupSettings from './GroupsSettings/GroupSettings'
import { useStore } from "../../ZustandStore/store";
import CurrentGroupSettings from "./CurrentGroupSettings/CurrentGroupSettings";
const SettingsPreview = ({currentGroups, settingsConfig}) => {
  const {selectedGroupId} = useStore();
  return (
    <div className={styles.settingsPreview}>
      <div className={styles.settings}>
          <div className={`medFont2 ${styles.title}`}>Настройки</div>
          <MainSettings settings={settingsConfig}/>
      </div>
      { selectedGroupId ? <CurrentGroupSettings/> :
        <div className={styles.settings}>
          <div className={`medFont2 ${styles.title}`}>Настройки групп</div>
            <GroupSettings groups={currentGroups} />
        </div>
      }
    </div>

  )
}

export default SettingsPreview