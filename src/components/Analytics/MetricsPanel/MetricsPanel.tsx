import styles from "./MetricsPanel.module.scss"
import { useAllGroups} from '@/entities/api/queries'
import UniversalMetrics from './UniversalMetrics/UniversalMetrics';
import HabitSelector from '@/features/AnalyticsFeatures/Metrics/HabitSelector';
import { useStore } from '@/entities/ZustandStore/store';
import TypicalMetrics from './TypicalMetrics/TypicalMetrics';
import { CircularProgress } from "@mui/material";



const MetricsPanel = () => {
    const {data: allGroups, isPending: allGroupsPending, isFetching: allGroupsFetching, isError: allGroupsError} = useAllGroups();
    const{selectedHabitId} = useStore();  
    console.log("All Groups:", allGroups);
  return (
    <section className='container'>
        <article className={styles.head}>
            <div className={styles.center}>
                <h1 className="medFont2">
                    Метрики
                </h1>
            </div>
            <div className={styles.right}>
                <div className="date">
                    -
                    <div className="medFont0">
                        {/*{date} {todayDate(date) && <>{"(сегодня)"}</>}}*/}
                    </div>
                </div> 
            </div>
        </article>
        <article>
            {(!allGroupsPending && allGroups.data.length === 0) && <div className="tableLoading">Нет данных для отображения. Создайте группы в настройках</div>}
            {(!allGroupsPending && allGroups.data.length > 0) && <HabitSelector groups={allGroups.data}/>}
            {allGroupsPending || allGroupsFetching ? <div className="tableLoading"><CircularProgress sx={{color: "var(--textColor)"}}/></div> :
                <div>
                    <div style={{minHeight: "var(--auniversalHeight)"}}>{selectedHabitId && <UniversalMetrics habitId={selectedHabitId}/>}</div>
                    {selectedHabitId && <div style={{minHeight: "175px"}}> <TypicalMetrics habitId={selectedHabitId}/></div>}
                </div>
            }
        </article>
    </section>
  )
}

export default MetricsPanel