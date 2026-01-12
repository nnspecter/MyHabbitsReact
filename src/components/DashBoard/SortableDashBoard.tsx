import { Accordion, AccordionSummary, CircularProgress } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./DashBoard.module.scss"
import { PopOver } from "./DatePicker/PopOver";
import { useStore } from "@/ZustandStore/store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect} from "react";
import { useDashboardHabbit } from "@/api/queries";
import { MountAnimation } from "@/animations/MountAnimation";
import { SortBoard } from "./SortBoard/SortBoard";
dayjs.extend(customParseFormat);


const SortableDashBoard = () => {
  const {selectedDate} = useStore();
  const date = dayjs(selectedDate).format("DD.MM.YYYY");
  
  //реализую выдачу полям из родителя
  const{data, isPending} = useDashboardHabbit(selectedDate);
  
  useEffect(()=>{
    console.log("Дашборд",data)
    console.log("Дата для дашборда",selectedDate)
  },[data])
  

  const todayDate = (date) => {
    const today = dayjs(new Date()).format("DD.MM.YYYY");
    
    if(date === today) return true;
    
    else return false;
  }

  return (
    <MountAnimation>
      <div className="container">
          <div className={styles.head}>
            <div className={styles.center}>
              <div className="medFont2">
                  Запись привычек
              </div>
            </div>
            <div className={styles.right}>
              <div className="date">
                
                  <PopOver/>
                  <div className="medFont0">
                    {date} {todayDate(date) && <>{"(сегодня)"}</>}
                  </div>
              </div> 
            </div>
          </div>

          <div className={styles.habitBody}>
            {isPending && <div className="tableLoading"><CircularProgress sx={{color: "#454545"}}/></div>}
            {!isPending && data?.data.groups.length === 0 && (
              <div className="tableLoading">Нет данных для отображения. Создайте группы в настройках</div>
            )}

            {data?.data.groups.map((group, groupKey) => (
                <Accordion key={`dashboardGroupAccordionKey-${groupKey}`} sx={{backgroundColor: "#e9e9e9ff", position: "relative"}} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}>
                    <div className="medFont1">{group.name}</div>
                  </AccordionSummary>
                  <div className={styles.accordionData}>
                    {group.habits.length === 0 && 
                      <div className={styles.noData}>
                        <div className="smallFont2">
                          В группе нет привычек
                        </div>
                      </div>
                    }
                    <SortBoard groupId={group.id} habits={group.habits}/>
                  </div>
                </Accordion>
              
            ))}
          </div>
          
          
      </div>
    </MountAnimation>
  )
}

export default SortableDashBoard