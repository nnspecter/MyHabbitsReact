import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from "@mui/material"
import NewRecordButton from "../../features/DashBoardButtons/RecordButton"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./DashBoardNew.module.scss"
import { PopOver } from "./DatePicker/PopOver";
import { useStore } from "../../ZustandStore/store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import HabitField from "./Habit/HabitField";
import { use, useEffect, useState } from "react";
import { useDashboardHabbit } from "../../api/queries";
dayjs.extend(customParseFormat);

const DashBoard = () => {
  const {selectedDate} = useStore();
  const date = dayjs(selectedDate).format("DD-MM-YYYY");
  
  //реализую выдачу полям из родителя
  const{data, isPending} = useDashboardHabbit(selectedDate);
  
  useEffect(()=>{
    console.log("Дашборд",data)
    console.log("Дата для дашборда",selectedDate)
  },[data])
  

  const todayDate = (date) => {
    const today = dayjs(new Date()).format("DD-MM-YYYY");
    
    if(date === today) return true;
    else return false;
  }

  return (
    <div className={styles.dashBoard}>
        <div className={styles.first}>
          <div className={styles.title}>
            <div className="medFont2">
                Запись привычек
            </div>
          </div>
          <div className={styles.date}>
            <PopOver/>{date} {todayDate(date) && <>{"(сегодня)"}</>}
          </div>
        </div>

        <div className={styles.habitBody}>
          {isPending && <div className="tableLoading"><CircularProgress sx={{color: "#454545"}}/></div>}
          {!isPending && data?.data.groups.length === 0 && (
            <div className="tableLoading">Нет данных для отображения</div>
          )}

          {data?.data.groups.map((group, groupKey) => (
              <Accordion key={`dashboardGroupAccordionKey-${groupKey}`} sx={{backgroundColor: "#e9e9e9ff"}}>
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