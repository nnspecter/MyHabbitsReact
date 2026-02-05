import React, { useState } from 'react'
import styles from "./MetricsPanel.module.scss"
import { useAllGroups} from '@/shared/api/queries'
import UniversalMetrics from './UniversalMetrics/UniversalMetrics';
import HabitSelector from '@/features/AnalyticsFeatures/Metrics/HabitSelector';
import { useStore } from '@/shared/ZustandStore/store';
import TypicalMetrics from './TypicalMetrics/TypicalMetrics';
import { Habit } from '@/shared/api/api';


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
                    -
                    <div className="medFont0">
                        {/*{date} {todayDate(date) && <>{"(сегодня)"}</>}}*/}
                    </div>
                </div> 
            </div>
        </div>
        {(!allGroupsPending && allGroups.data.length === 0) && <div className="tableLoading">Нет данных для отображения. Создайте группы в настройках</div>}
        {(!allGroupsPending && allGroups.data.length > 0) && <HabitSelector groups={allGroups.data}/>}
        <div style={{minHeight: "var(--auniversalHeight)"}}>{selectedHabitId && <UniversalMetrics habitId={selectedHabitId}/>}</div>
        {selectedHabitId && <div style={{minHeight: "175px"}}> <TypicalMetrics habitId={selectedHabitId}/></div>}

    </div>
  )
}

export default MetricsPanel