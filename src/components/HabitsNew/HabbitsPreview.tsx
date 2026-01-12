import styles from "./Habbits.module.scss"
import { useStore } from '@/ZustandStore/store';
import CustomTable from './Table/Table';
import { TablePopOver } from "./DatePicker/TablePopOver";
import dayjs from "dayjs";
import { MountAnimation } from "@/animations/MountAnimation";
import { todayDate } from "@/features/TodayDate/TodayDate";
const HabbitsPreview = () => {
  const {selectedTableDate} = useStore();
  const date = dayjs(selectedTableDate).format("DD.MM.YYYY")
  return (
    <MountAnimation>
      <div className='container'>
        <div className={styles.head}>
          <div className={styles.center}> 
            <div className='medFont2'>Превью записей</div>
          </div>
          <div className={styles.right}>
            <div className="date">
              <TablePopOver/>
              <div className="medFont0">
                {date} {todayDate(date) && <>{"(сегодня)"}</>}
              </div>
            </div>
          </div>
        </div>
        <CustomTable/>
      </div>
    </MountAnimation>
  )
}

export default HabbitsPreview