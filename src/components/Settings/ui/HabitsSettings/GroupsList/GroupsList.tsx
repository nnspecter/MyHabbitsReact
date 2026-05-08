"use client"
import styles from "./GroupSettings.module.scss"
import { HabitsGroup } from '@/components/TablePanel/api/tableTypes'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStore } from "@/entities/ZustandStore/store"
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Filter1Icon from '@mui/icons-material/Filter1';
import NotesIcon from '@mui/icons-material/Notes';


interface GroupSettingsProps {
  groups: HabitsGroup[];
}

const GroupsList = ({groups}: GroupSettingsProps) => {
  const {setSelectedHabitId, setSelectedGroupId} = useStore();
  return (
    <Box
      className={styles.GroupSettings}
      sx={{
        maxHeight: 350,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0,0,0,0.2) transparent',
        '&::-webkit-scrollbar': {
          width: 6,
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: 3,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.35)',
          },
        },
      }}
    >
      {groups.map((group) => (
        <Accordion key={`groupsSettings-${group.id}`} sx={{borderRadius: 3}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className={styles.accordion}>
            <div className={styles.group}>
              <div style={{backgroundColor: group.color, padding: 20, borderRadius: 5}} 
                onClick={()=> setSelectedGroupId(group.id)}/>
              <section>
                <div>
                  <h1 className='settingsTruncated smallFont2'>{group.name}</h1>
                </div>
                <div>
                  <p className="smallFont1" style={{margin: 0}}>
                    Всего привычек: {group.habits.length}
                  </p>
                </div>
              </section>
              <div style={{backgroundColor: group.color, padding: 8, borderRadius: 12}}/>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {group.habits.length > 2 ? 
              <section className={styles.habits}>
                {group.habits.map((habit, habitKey) => (
                  <Button 
                    key={`habit - ${habitKey}`}
                    style={{ textTransform: 'none' }}
                    className={styles.habit}
                    onClick={() => setSelectedHabitId(habit.id)}>
                    <div className={styles.inButton}>  
                      {habit.type === "GENERAL" && <CheckIcon/>}
                      {habit.type === "NUMBER" && <Filter1Icon/>}
                      {habit.type === "TEXT" && <NotesIcon/>}
                      {habit.type === "TIME" && <AccessTimeIcon/>}
                      <p className="smallFont1">{habit.name}</p>
                    </div>
                  </Button>
                ))}
              </section> : 
              <div>здесь пока что пусто</div>
            }
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default GroupsList