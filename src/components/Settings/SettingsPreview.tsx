import styles from "./Settings.module.scss";
import MainSettings from './MainSettings/MainSettings';
import GroupSettings from './GroupsSettings/GroupSettings';
import { useStore } from "../../ZustandStore/store";
import CurrentGroupSettings from "./CurrentGroupSettings/CurrentGroupSettings";
import { motion } from "framer-motion";
import { MountAnimation } from "../../animations/MountAnimation";

const SettingsPreview = ({ currentGroups, settingsConfig }) => {
  const { selectedGroupId } = useStore();
  
  return (
    <MountAnimation>
    <div className={styles.settingsPreview}>
      <div className={styles.settings}>
        <div className={`medFont2 ${styles.title}`}>Настройки</div>
        <MainSettings settings={settingsConfig} />
      </div>
      
      {selectedGroupId ? (
        <MountAnimation key={"currentGroup"}>
          <CurrentGroupSettings />
        </MountAnimation>
      ) : (
        <MountAnimation key={"GroupSettings"}>
          <div className={styles.settings}>
            <div className={`medFont2 ${styles.title}`}>Настройки групп</div>
            <GroupSettings groups={currentGroups} />
          </div>
        </MountAnimation>
      )}
    </div>
    </MountAnimation>
  );
};

export default SettingsPreview;