import { useHabitStats } from "@/api/queries";


const Metrics = ({habitId}: {habitId: number}) => {
    const {data: habitStats, isLoading: habitStatsLoading, isError: habitStatsError} = useHabitStats(habitId); 
  return (
    <div>
        Метрики привычки с id {habitId}
        {habitStatsLoading && <div>Загрузка метрик...</div>}
        {habitStatsError && <div>Ошибка при загрузке метрик</div>}
        {habitStats && <div>
            <div>completion: {habitStats.data.completion}</div>
            <div>completionCount: {habitStats.data.completionCount}</div>
            <div>weekCompletion: {habitStats.data.weekCompletion}</div>
            <div>maxStreak: {habitStats.data.maxStreak}</div>
            <div>maxMiss: {habitStats.data.maxMiss}</div>
            <div>currentStreak: {habitStats.data.currentStreak}</div>
            <div>currentMiss: {habitStats.data.currentMiss}</div>

            </div>}
    </div>
  )
}

export default Metrics