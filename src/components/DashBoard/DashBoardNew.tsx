import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import NewRecordButton from "../../features/DashBoardButtons/RecordButton"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./DashBoardNew.module.scss"
import { PopOver } from "../../features/DatePicker/PopOver";
import { useStore } from "../../ZustandStore/store";
import dayjs from "dayjs";
import HabitField from "./Habit/HabitField";


const DashBoard = ({groups}) => {
  console.log(groups)
  const {selectedDate} = useStore();

  const todayDate = (date) => {
    const today = dayjs(new Date()).format("DD-MM-YYYY");
    if(date === today) return true;
    else return false;
  }

  return (
    <div className={styles.dashBoard}>
        <div className={styles.first}>
          <div className="medFont2">
              Запись привычек
          </div>
          <div className={styles.date}>
            Дата: {selectedDate} {todayDate(selectedDate) && <>{"(сегодня)"}</>}<PopOver/>
          </div>
        </div>
        
        <div>
          {groups.map((group, groupKey) => (
            
              <Accordion key={`dashboardGroupAccordionKey-${groupKey}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}>
                  <div className="medFont1">{group.name}</div>
                </AccordionSummary>
                <div className={styles.accordionData}>
                {group.habits.map((habit, habitKey)=> (
                  <AccordionDetails key={`dashboardHabitAccordionKey-${habitKey}`}>
                      <HabitField habit={habit}/>
                      
                  </AccordionDetails>
                ))}
                </div>
              </Accordion>
            
          ))}
        </div>
        
        
    </div>
  )
}

export default DashBoard