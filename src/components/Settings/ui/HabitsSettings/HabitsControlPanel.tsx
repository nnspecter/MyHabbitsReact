import { MountAnimation } from '@/animations/MountAnimation';
import { useStore } from '@/entities/ZustandStore/store';
import CurrentGroupSettings from './CurrentGroupSettings/CurrentGroupSettings';
import { CircularProgress } from '@mui/material';
import GroupsList from './GroupsList/GroupsList';
import styles from "./HabitsControlPanel.module.scss" 
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { useAllGroups } from '../../models/settingsQueryes';

const HabitsControlPanel = () => {
  const { selectedHabitId, selectedGroupId } = useStore();
  const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
  
  console.log(allGroupsQuery);
  return (
    <div className={styles.container}>
      <MountAnimation key={"GroupSettings"}>
        <header>
          <h1 className={`medFont1`}>
            Группы
          </h1>
        </header>
        <article>  
          {isPendingAllGroups ?
            <div className="tableLoading">
              <CircularProgress sx={{color: "#454545"}}/>
            </div>
            : <GroupsList groups={allGroupsQuery.data} />}
        </article>
      </MountAnimation>
        <MountAnimation key={"currentGroup"}>
          <SettingsPanel/>
        </MountAnimation>
      
    </div>
  )
}

export default HabitsControlPanel