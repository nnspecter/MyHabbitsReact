import { useHabitStats } from "@/api/queries";
import styles from "./TypicalMetrics.module.scss"
import OneMetric from "@/shared/Analytics/OneMetric/OneMetric";
import { formatTimeShort, formatTimeShortFromSeconds } from "@/features/TimeFormatter/TimeFormatter";
import { PieChart } from '@mui/x-charts/PieChart';

const TypicalMetrics = ({habitId}: {habitId: number}) => {
    const {data: habitStats, isLoading: habitStatsLoading, isError: habitStatsError} = useHabitStats(habitId);
    if(habitStatsLoading) return <></>
    const stats = habitStats.data
  return (
    <div className={styles.main}>
        <h2 className="medFont1">Конкретные значения</h2>
        {habitStats.data?.numData && 
            <div className={styles.section}>
            <OneMetric name="Максимум" count={stats.numData.max}/>
            <OneMetric name="Минимум" count={stats.numData.min}/>
            <OneMetric name="Среднее" count={stats.numData.avg.toFixed(2)}/>
            <OneMetric name="Сумма" count={stats.numData.sum}/>
            </div>
        }
        {habitStats.data?.timeData && 
            <div className={styles.section}>
                <OneMetric name="Максимум" count={formatTimeShort(stats.timeData.max)}/>
                <OneMetric name="Минимум" count={formatTimeShort(stats.timeData.min)}/>
                <OneMetric name="Среднее" count={formatTimeShortFromSeconds(stats.timeData.avg)}/>
            </div>
        }
        {habitStats.data?.textData && 
            <div className={styles.section}>
                <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: 10, label: 'series A' },
                            { id: 1, value: 15, label: 'series B' },
                            { id: 2, value: 20, label: 'series C' },
                        ],
                        },
                    ]}
                    width={200}
                    height={200}
                />
            </div>
        }
    </div>
  )
}

export default TypicalMetrics