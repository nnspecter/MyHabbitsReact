"use client"
import styles from "./Settings.module.scss";
import MainSettings from './MainSettings/MainSettings';
import GroupSettings from './GroupsSettings/GroupSettings';
import { useStore } from "@/entities/ZustandStore/store";
import CurrentGroupSettings from "./CurrentGroupSettings/CurrentGroupSettings";
import { MountAnimation } from "@/animations/MountAnimation";
import { useAllGroups, useSettingsConfig } from "@/entities/api/queries";
import { CircularProgress } from "@mui/material";

const SettingsPreview = () => {
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
  const {data: settingsConfigQuery, isPending: isPendingSettingsConfig} = useSettingsConfig();
  
  const { selectedGroupId } = useStore();

  const currentGroups = allGroupsQuery?.data;
  const settingsConfig = settingsConfigQuery?.data;



  return (
    <MountAnimation>
    <section className={styles.settingsPreview}>
      <section className={styles.settings}>
        <header>
          <h1 className={`medFont2 ${styles.title}`}>Настройки</h1>
        </header>
        <article>
          {isPendingSettingsConfig ? 
            <div className="tableLoading">
              <CircularProgress sx={{color: "#454545"}}/>
            </div>
          : <MainSettings settings={settingsConfig} />}
        </article>
      </section>



      {selectedGroupId ? (
        <MountAnimation key={"currentGroup"}>
          <CurrentGroupSettings />
        </MountAnimation>
      ) : (
        <MountAnimation key={"GroupSettings"}>
          <section className={styles.settings}>
            <header>
              <h1 className={`medFont2 ${styles.title}`}>Настройки групп</h1>
            </header>
            <article>  
              {isPendingAllGroups ?
                <div className="tableLoading">
                  <CircularProgress sx={{color: "#454545"}}/>
                </div>
                : <GroupSettings groups={currentGroups} />}
            </article>
          </section>
        </MountAnimation>
      )}
    </section>
    </MountAnimation>
  );
};

export default SettingsPreview;