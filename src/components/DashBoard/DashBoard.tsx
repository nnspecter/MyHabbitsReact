import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import NewRecordButton from "../../features/DashBoardButtons/RecordButton"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./DashBoard.module.scss"

const DashBoard = ({groups}) => {
  console.log(groups)
  return (
    <div className={styles.dashBoard}>
        <div className="medFont2">
            Запись привычек
        </div>
        Выберите привычку:
        <div className={styles.habitGroups}>
          {groups.map((el, groupKey) => (
            <div className={styles.Groups} key={`dashboardGroupKey-${groupKey}`}>
              <div className="medFont1">{el.name}:</div>
              {el.habits.map((habit, habitKey)=> (
                <div className={styles.Habits} key={`dashboardHabitKey-${habitKey}`}>
                  <NewRecordButton habit={habit} groupName={el.name}/>
                </div>
              ))}
            </div>
          ))}
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
                      <NewRecordButton habit={habit} groupName={group.name}/>
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