import { HabbitsAllGroups } from '@/api/api'
import { useStore } from '@/ZustandStore/store'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { use, useEffect, useRef, useState } from 'react'


const HabitSelector = ({groups}: {groups: HabbitsAllGroups[]}) => {
    const{selectedHabitId, setSelectedHabitId} = useStore();
    const [selectedGroup, setSelectedGroup] = useState<HabbitsAllGroups>(groups.find(g => g.habits.length > 0) || groups[0]);
    const isFirstRender =  useRef(true);
    
    useEffect(() => {
        if(selectedHabitId){
            const group = groups.find(g =>
                g.habits.some(h => h.id === selectedHabitId)
            );
            setSelectedGroup(group ? group : groups[0]);
            isFirstRender.current = false;
            console.log("есть выбранное - первый рендер");
        }
        else{
            setSelectedHabitId(groups.find(g => g.habits.length > 0)?.habits[0].id || null);
            isFirstRender.current = false;
            console.log("нет выбранного - первый рендер");
        }

    }, [isFirstRender]);

    
    
    //handlers
    const handleGroupChange = (groupId: number) =>{ 
        const group = groups.find(g => g.id === groupId) || groups[0]
        setSelectedGroup(group);
        if(group.habits.length>0) setSelectedHabitId(group?.habits[0]?.id);
        else setSelectedHabitId(null);
    }

    const handleHabitChange = (habitId: number) => {
        setSelectedHabitId(habitId);
    }


  return (
    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Группа</InputLabel>
            <Select
                labelId="group-label"
                id="group-select"
                value={selectedGroup.id}
                label="Группа"
                onChange={e => handleGroupChange(Number(e.target.value))}
                >
                {groups.map(group => (
                    <MenuItem value={group.id}>{group.name}</MenuItem>
                ))}
            </Select>
        </FormControl>

        <div style={{display: "flex", flexDirection: "row", gap: 10, minHeight: "100px", flexWrap: "wrap", transition: "min-height 0.3s ease"}}>
            {selectedGroup.habits.map((e, index) => 
                <Button 
                    key={`habitAInd${index}`}
                    variant='contained'
                    sx={{background: selectedHabitId === e.id ? "#2b2b2bff" : "#454545", height: "50%"}}
                    onClick={() => handleHabitChange(e.id)}
                    >
                    {e.name}
                </Button>)}
        </div>
        {/* <FormControl fullWidth style={{marginTop: "10px"}}>
            <InputLabel id="demo-simple-select-label">Привычка</InputLabel>
            <Select
                labelId="habit-label"
                id="habit-select"
                value={selectedHabitId || selectedGroup?.habits[0]?.id || ''}
                label="Привычка"
                onChange={e => handleHabitChange(Number(e.target.value))}
                >
                {selectedGroup.habits.map(habit => (
                    <MenuItem value={habit.id}>{habit.name}</MenuItem>
                ))}
            </Select>

        </FormControl> */}
    </div>
  )
}

export default HabitSelector