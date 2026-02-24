import { useHabitStats } from "@/entities/api/queries";
import styles from "./UniversalMetrics.module.scss"
import OneMetric from "../../../../entities/Analytics/OneMetric/OneMetric";
import { CircularProgress } from "@mui/material";

const UniversalMetrics = ({habitId}: {habitId: number}) => {
    const {data: habitStats, isLoading: habitStatsLoading, isError: habitStatsError} = useHabitStats(habitId); 
    
    if(habitStatsLoading){
      return(
        <div className="tableLoading">
          <CircularProgress sx={{color: "#454545"}}/>
        </div>
      )
    }
    console.log(habitStats.data)
  return (
    <div className={styles.metricsSections}>
        <div className={styles.section}>
          <h2 className="medFont1 ">
            Серия выполнений
          </h2>

          <div className={styles.metrics}>
            <OneMetric name="Максимум" count={habitStats.data.maxStreak}/>
            <OneMetric name="Текущая" count={habitStats.data.currentStreak}/>
            <OneMetric name="Пропуски" count={habitStats.data.maxMiss}/>
          </div>
        </div>
        
        <div className={styles.section}>
          <h2 className="medFont1 ">
            Выполнения
          </h2>

          <div className={styles.metrics}>
            <OneMetric name="Всего" count={`${habitStats.data.completion}%`}/>
            <OneMetric name="Кол-во" count={habitStats.data.completionCount}/>
            <OneMetric name="За неделю" count={habitStats.data.weekCompletion}/>
          </div>
        </div> 
        
    </div>
  )
}

export default UniversalMetrics