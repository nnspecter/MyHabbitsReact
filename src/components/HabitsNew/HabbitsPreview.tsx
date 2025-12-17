import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import CustomTable from './Table/Table';
import { useHabbits } from "../../api/queries";
import { CircularProgress } from "@mui/material";
import { TablePopOver } from "./DatePicker/TablePopOver";
const HabbitsPreview = () => {
  const {dateRange}=useStore();
  const {data: habbitsQuery, isPending} = useHabbits({startDate: dateRange.startDate, endDate: dateRange.endDate});
  
  return (
    <div className={styles.allHabbits}>
      <div className={styles.head}>
        <div className={styles.center}> 
          <div className='medFont2'>Превью всех привычек</div>
        </div>
        <div className={styles.right}><TablePopOver/></div>
      </div>
      {isPending && <div className="tableLoading"><CircularProgress sx={{color: "#454545"}}/></div>}
      {!isPending && <CustomTable dates={habbitsQuery.data.dates} groups={habbitsQuery.data.groups}/>}
    </div>
  )
}

export default HabbitsPreview