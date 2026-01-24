import { useHabitStats } from "@/api/queries";
import styles from "./Metrics.module.scss"
import OneMetric from "./OneMetric/OneMetric";
import { CircularProgress } from "@mui/material";

const Metrics = ({habitId}: {habitId: number}) => {
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
            <OneMetric name="Всего" count={habitStats.data.completionCount}/>
            <OneMetric name="За неделю" count={habitStats.data.weekCompletion}/>
          </div>
        </div>

        
    </div>


    // {<div>
    //     Метрики привычки с id {habitId}
    //     {habitStatsLoading && <div>Загрузка метрик...</div>}
    //     {habitStatsError && <div>Ошибка при загрузке метрик</div>}
    //     {habitStats && <div>
    //         <div>completion: {habitStats.data.completion}</div>
    //         <div>completionCount: {habitStats.data.completionCount}</div>
    //         <div>weekCompletion: {habitStats.data.weekCompletion}</div>
    //         <div>maxStreak: {habitStats.data.maxStreak}</div>
    //         <div>maxMiss: {habitStats.data.maxMiss}</div>
    //         <div>currentStreak: {habitStats.data.currentStreak}</div>
    //         <div>currentMiss: {habitStats.data.currentMiss}</div>

    //         </div>}
    // </div>}
  )
}

export default Metrics