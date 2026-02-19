import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useAddHabit} from '@/shared/api/mutations/mutations';
import InputLenght from '@/features/Input/InputLenght';
import { NewHabbit } from '@/shared/api/types/settings/groupSettings';


const NewHabitButton = ({groupId}: {groupId: number}) => {
    const [open, setOpen] = useState(false);
    const addMutation = useAddHabit();
    const [isError, setIsError] = useState<boolean>(false)

    const [newHabit, setNewHabit] = useState<NewHabbit>({
      groupId: groupId, //+
      name: "", //+
      type: "GENERAL", //+
      hidden: false, // +
      schedule: "EVERYDAY",
      scheduleN: 1,
    })
    const [maxScheduleN, setMaxScheduleN] = useState<number>(1)

    

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewHabit((prev)=>({...prev, name: event.target.value}))
      if(event.target.value.length > 0) setIsError(false);
    };
    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.value as "GENERAL" | "NUMBER" | "TEXT" | "TIME"; 
      setNewHabit((prev)=> ({...prev, type: type }))
    };
    const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => { //+
      setNewHabit((prev)=> ({...prev, hidden: event.target.checked}))
    };
    
    const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      const schedule = event.target.value as "EVERYDAY" | "IN_DAY" | "N_WEEK" | "N_MONTH"; 
      setNewHabit((prev)=> ({...prev, schedule: schedule }))
      switch(schedule){
        case "EVERYDAY": setMaxScheduleN(1);
          setNewHabit((prev)=> ({...prev, scheduleN: 1 }));
          break;
        case "IN_DAY": setMaxScheduleN(1);
          setNewHabit((prev)=> ({...prev, scheduleN: 1 }));
          break;
        case "N_WEEK": setMaxScheduleN(7);
          break;
        case "N_MONTH": setMaxScheduleN(30);
          break;
      };
    };

    const handleScheduleNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewHabit((prev => ({...prev, scheduleN: Number(event.target.value)})))
      console.log(event.target.value)
      
    };

    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
      if(newHabit.name.length > 0){
        addMutation.mutate(newHabit);
        setOpen(false);
      }
      else{
        setIsError(true)
      }
    };

  return (
    <React.Fragment>
        <Button 
          variant='contained'
          onClick={handleClickOpen}
          sx={{maxWidth: "20px", background: "var(--buttonColor)"}}
          style={{ fontSize: "12pt", fontWeight: "bold", borderRadius: "5px", height: "30px"}}
        >
          <div className='smallFont2' style={{color: "var(--background)"}}>+</div>
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#D9D9D9",
            color: "#454545",
            borderRadius: "16px",
            
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Создание привычки"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
          
            <Input 
              error= {isError}
              placeholder="Название привычки"
              onChange={handleNameChange}
              fullWidth
              inputProps={{ maxLength: 25 }}
              endAdornment={
                <InputAdornment position="end">
                  <InputLenght valueLenght={newHabit.name.length}/>
                </InputAdornment>
              }
            />
            
          <FormControl fullWidth>
            <InputLabel id="type-select-label">Тип</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-simple-select"
              value={newHabit.type}
              label="Тип"
              onChange={handleTypeChange}
            >
              <MenuItem value={"GENERAL"}>Обычный</MenuItem>
              <MenuItem value={"NUMBER"}>Число</MenuItem>
              <MenuItem value={"TEXT"}>Текст</MenuItem>
              <MenuItem value={"TIME"}>Время</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="schedule-select-label">Повторять</InputLabel>
            <Select
              labelId="schedule-select-label"
              id="schedule-simple-select"
              value={newHabit.schedule}
              label="Повторять"
              onChange={handleScheduleChange}
              
            >
              <MenuItem value={"EVERYDAY"}>Ежедневно</MenuItem>
              <MenuItem value={"IN_DAY"}>Через день</MenuItem>
              <MenuItem value={"N_WEEK"}>Еженедельно</MenuItem>
              <MenuItem value={"N_MONTH"}>Ежемесячно</MenuItem>
            </Select>
          </FormControl>

          {maxScheduleN > 1 && <FormControl fullWidth>
            <InputLabel id="schedule-select-label">Кол-во повторов</InputLabel>
            <Select
              labelId="schedule-select-label"
              id="schedule-simple-select"
              value={`${newHabit.scheduleN}`}
              label="Кол-во повторов"
              onChange={handleScheduleNChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {Array.from({ length: maxScheduleN }, (_, i) => (
                <MenuItem key={`scheduleN-${i+1}`} value={i+1}>{i+1}</MenuItem>
              ))}
              
            </Select>
          </FormControl>}
          

         <div style={{display:"flex", alignItems: "center"}}>Скрыть<Checkbox onChange={handleHiddenChange} /></div>

        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
          <Button onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button >
          <Button onClick={handleAccept} autoFocus sx={{color: "#454545"}}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default NewHabitButton