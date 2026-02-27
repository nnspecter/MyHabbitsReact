import { Accordion, AccordionSummary, CircularProgress } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./DashBoard.module.scss"
import { PopOver } from "./DatePicker/PopOver";
import { useStore } from "@/entities/ZustandStore/store";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect} from "react";
import { useDashboardHabbit } from "@/entities/api/queries";
import { MountAnimation } from "@/animations/MountAnimation";
import { SortBoard } from "./SortBoard/SortBoard";
import { HabitsGroup } from "@/entities/api/types/dashboard";
dayjs.extend(customParseFormat);


const SortableDashBoard = () => {
  const {selectedDate} = useStore();
  const date = dayjs(selectedDate).format("DD.MM.YYYY");
  
  //реализую выдачу полям из родителя
  const{data, isPending, isFetching, isError, error} = useDashboardHabbit(selectedDate);
  
  useEffect(()=>{
    console.log("Дашборд",data)
    console.log("Дата для дашборда",selectedDate)
  },[data])
  

  const todayDate = (date: string) => {
    const today = dayjs(new Date()).format("DD.MM.YYYY");
    
  if(date === today) return true;  
    else return false;
  }
  if(isError){
    console.log(error.message)
  }


  return (
    <MountAnimation>
      <section className="container">
          <header className={styles.head}>
            <div className={styles.center}>
              <h1 className="medFont2">
                  Запись привычек
              </h1>
            </div>
            <div className={styles.right}>
              <div className="date">
                  <PopOver/>
                  <div className="medFont0">
                    {date} {todayDate(date) && <>{"(сегодня)"}</>}
                  </div>
              </div> 
            </div>
          </header>

          
          <article className={styles.habitBody}>
            {isError && <div className="tableLoading">Возникла ошибка</div>}
            {isPending && isFetching && <div className="tableLoading"><CircularProgress sx={{color: "#454545"}}/></div>}
            {!isPending && data?.data.groups.length === 0 && (
              <div className="tableLoading">Нет данных для отображения. Создайте группы в настройках</div>
            )}

            <section className={styles.accordionWrapper}>
            {!isFetching && data?.data.groups.map((group: HabitsGroup, groupKey: number) => (
              <article className={styles.groupWrapper} key={`dashboardGroupAccordionKey-${groupKey}`}>
                <Accordion  sx={{
                  backgroundColor: "var(--background)",
                  position: "relative",
                  boxShadow: "var(--dashboardShadow) inset",
                  borderRadius:"var(--dashboardBorderRadius)" }} defaultExpanded>
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
              </article>
            ))}
            </section>
          </article>
      </section>
    </MountAnimation>
  )
}

export default SortableDashBoard