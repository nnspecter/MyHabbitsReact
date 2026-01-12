"use client"
import styles from "./Settings.module.scss";
import MainSettings from './MainSettings/MainSettings';
import GroupSettings from './GroupsSettings/GroupSettings';
import { useStore } from "@/ZustandStore/store";
import CurrentGroupSettings from "./CurrentGroupSettings/CurrentGroupSettings";
import { MountAnimation } from "@/animations/MountAnimation";
import { useAllGroups, useSettingsConfig } from "@/api/queries";
import { CircularProgress } from "@mui/material";

const SettingsPreview = () => {
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
  const {data: settingsConfigQuery, isPending: isPendingSettingsConfig} = useSettingsConfig();
  
  const { selectedGroupId } = useStore();

  const currentGroups = allGroupsQuery?.data;
  const settingsConfig = settingsConfigQuery?.data;

  if (isPendingAllGroups || isPendingSettingsConfig) {
    return <div className="tableLoading"><CircularProgress/></div>;
  }
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