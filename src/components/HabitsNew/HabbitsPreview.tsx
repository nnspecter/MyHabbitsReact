import styles from "./Habbits.module.scss"
import { useStore } from '@/shared/ZustandStore/store';
import CustomTable from './Table/Table';
import { TablePopOver } from "./DatePicker/TablePopOver";
import dayjs from "dayjs";
import { MountAnimation } from "@/animations/MountAnimation";
import { todayDate } from "@/features/TodayDate/TodayDate";
import { Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


const HabbitsPreview = () => {
  const {selectedTableDate, updateTableDate} = useStore();
  const date = dayjs(selectedTableDate).format("DD.MM.YYYY")
  return (
    <MountAnimation>
      <div className='container'>
        <div className={styles.head}>
          <div className={styles.center}> 
            <div className='medFont2'>Превью записей</div>
          </div>
          <div className={styles.right}>
            <Button sx={{padding: 0, margin: 0, minWidth: 0, width: "auto", color: "var(--buttonColor)"}} onClick={() => updateTableDate("left")} ><KeyboardArrowLeftIcon/></Button>
            <div className="date">
              <TablePopOver/>
              <div className="medFont0" >{/* style={{color: todayDate(date) && "rgb(57, 179, 84)" }} */}
                {date} {todayDate(date) && "*"}
              </div>
            </div>
            <Button sx={{padding: 0, margin: 0, minWidth: 0, width: "auto", color: "var(--buttonColor)"}} onClick={() => updateTableDate("right")} ><ChevronRightIcon/></Button>
          </div>
        </div>
        <div className={styles.table}>
          <CustomTable/>
        </div>
      </div>
    </MountAnimation>
  )
}

export default HabbitsPreview