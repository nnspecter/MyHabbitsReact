import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import CustomTable from './Table/Table';
import { useHabbits } from "../../api/queries";
import { CircularProgress } from "@mui/material";
import { TablePopOver } from "./DatePicker/TablePopOver";
import { dateFormatter } from "../..//features/DateFormatters/DateFormatter";
import dayjs from "dayjs";
const HabbitsPreview = () => {
  const {selectedTableDate} = useStore();
  
  return (
    <div className={styles.allHabbits}>
      <div className={styles.head}>
        <div className={styles.center}> 
          <div className='medFont2'>Превью всех привычек</div>
        </div>
        <div className={styles.right}>
          {dayjs(selectedTableDate).format("DD.MM.YYYY")}
          <TablePopOver/>
        </div>
      </div>
       <CustomTable/>
    </div>
  )
}

export default HabbitsPreview