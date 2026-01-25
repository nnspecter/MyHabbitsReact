import React from 'react'
import styles from "./MetricsPanel.module.scss"
import { useAllGroups} from '@/api/queries'
import UniversalMetrics from './UniversalMetrics/UniversalMetrics';
import HabitSelector from '@/features/AnalyticsFeatures/Metrics/HabitSelector';
import { useStore } from '@/ZustandStore/store';


const MetricsPanel = () => {
    const {data: allGroups, isPending: allGroupsPending, isError: allGroupsError} = useAllGroups();
    const{selectedHabitId} = useStore();  
    console.log("All Groups:", allGroups);
  return (
    <div className='container'>
        <div className={styles.head}>
            <div className={styles.center}>
                <div className="medFont2">
                    Метрики
                </div>
            </div>
            <div className={styles.right}>
                <div className="date">
                    Календарь аналитики
                    <div className="medFont0">
                        {/*{date} {todayDate(date) && <>{"(сегодня)"}</>}}*/}
                    </div>
                </div> 
            </div>
        </div>
        {(!allGroupsPending && allGroups.data.length === 0) && <div className="tableLoading">Нет данных для отображения. Создайте группы в настройках</div>}
        {(!allGroupsPending && allGroups.data.length > 0) && <HabitSelector groups={allGroups.data}/>}
        <div style={{minHeight: "175px"}}>{selectedHabitId && <UniversalMetrics habitId={selectedHabitId}/>}</div>
    </div>
  )
}

export default MetricsPanel