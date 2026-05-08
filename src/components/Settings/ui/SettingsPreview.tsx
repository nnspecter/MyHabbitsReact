"use client"
import styles from "./Settings.module.scss";
import MainSettings from './MainSettings/MainSettings';
import GroupsList from './HabitsSettings/GroupsList/GroupsList';
import { useStore } from "@/entities/ZustandStore/store";
import CurrentGroupSettings from "./HabitsSettings/CurrentGroupSettings/CurrentGroupSettings";
import { MountAnimation } from "@/animations/MountAnimation";
import { CircularProgress } from "@mui/material";
import HabitsControlPanel from "./HabitsSettings/HabitsControlPanel";
import { useSettingsConfig } from "../models/settingsQueryes";

const SettingsPreview = () => {
  
  const {data: settingsConfigQuery, isPending: isPendingSettingsConfig} = useSettingsConfig();
  
  const { selectedGroupId } = useStore();

  
  const settingsConfig = settingsConfigQuery?.data;



  return (
    <MountAnimation>
    <section className={styles.settingsPreview}>
      <section className={styles.settings}>
        <div className={styles.mainLine}>
          <section>
            <h1 className={`medFont2 ${styles.title}`}>Панель управления</h1>
            <article className={styles.text}>
              <p className={`smallFont1`}>
                Изменяйте свои привычки и группы, удаляйте, редактируйте,
                добавляйте новое, экспортируйте и импортируйте!
              </p>
            </article>
          </section>
          {!isPendingSettingsConfig && <MainSettings settings={settingsConfig} />}
        </div>
        
        <HabitsControlPanel/>
      </section>
    </section>
    </MountAnimation>
  );
};

export default SettingsPreview;