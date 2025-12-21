import DeleteButton from '../../../../../features/SettingsButtons/DeleteButton'
import HiddenCheckbox from '../../../../../features/SettingsButtons/HiddenCheckbox'
import styles from "./CurrentSettings.module.scss"
import GroupSetiingsButton from '../../../../../features/SettingsButtons/GroupSettingsButton'
const CurrentSettings = ({group}) => {

  return (
    <div className={styles.CurrentSettings}>
      <GroupSetiingsButton group={group}/>
      <DeleteButton groupId={group.id}/>
      <HiddenCheckbox id={group.id} hidden={group.hidden}/>
    </div>
  )
}

export default CurrentSettings