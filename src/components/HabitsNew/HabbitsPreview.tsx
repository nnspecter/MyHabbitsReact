import styles from "./Habbits.module.scss"
import { useStore } from '../../ZustandStore/store';
import CustomTable from './Table/Table';
import { useHabbits } from "../../api/queries";
import { CircularProgress } from "@mui/material";
import { TablePopOver } from "./DatePicker/TablePopOver";
import { dateFormatter } from "../..//features/DateFormatters/DateFormatter";
import dayjs from "dayjs";
import { MountAnimation } from "../../animations/MountAnimation";
const HabbitsPreview = () => {
  const {selectedTableDate} = useStore();
  const todayDate = (date) => {
      const today = dayjs(new Date()).format("DD.MM.YYYY");
      
      if(date === today) return true;
      else return false;
    }
  return (
    <MountAnimation>
      <div className={styles.allHabbits}>
        <div className={styles.head}>
          <div className={styles.center}> 
            <div className='medFont2'>Превью всех привычек</div>
          </div>
          <div className={styles.right}>
            <TablePopOver/>
            {dayjs(selectedTableDate).format("DD.MM.YYYY")} {todayDate(dayjs(selectedTableDate).format("DD.MM.YYYY")) && <>{"(сегодня)"}</>}
          </div>
        </div>
        <CustomTable/>
      </div>
    </MountAnimation>
  )
}

export default HabbitsPreview