import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNewRecord } from '../../shared/api/mutations';
import { Habit, NewRecord} from '@/shared/api/api'

interface NewRecordButtonProps {
  groupName: string;
  habit: Habit

}


const NewRecordButton: React.FC<NewRecordButtonProps> = ({habit, groupName})   => {
  const [dateStatus, setDateStatus] = useState(false);

  const[date, setDate]=useState("");
  
  const [newRecord, setNewRecord] = useState<NewRecord>({
    habitId: habit.id,
    date: "",
    value: "",
  });

  useEffect(() => {
    setNewRecord(prev => ({
      ...prev,
      habitId: habit.id,
    }));

    // сделать отдельную функцию или useEffect
    const record = habit.records.find(el=>el.date === newRecord.date);
    if(record) setDateStatus(true)
  }, [habit]);
    
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const newRecordMutation = useNewRecord()


  const handleValueChange = (newValue: string | number | boolean) => {
    setNewRecord(prev => ({...prev, value: newValue}))
    console.log(newValue)
  }

  const handleDateChange = (newDate: string) => {
    const record = habit.records.find(el=>el.date === newDate);
    setDate(newDate);
    if(record){
        setDateStatus(true)
        setNewRecord(prev => ({
            ...prev,
            date: newDate,
            value: record.value,
        }));
    }
    else{
        setDateStatus(false);
        setNewRecord(prev => ({
            ...prev,
            value: "",
        }));
    }
  }




  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleAccept = () => {
  const value =
    habit.type === "NUMBER"
      ? newRecord.value === 0 || newRecord.value === ""
        ? null
        : Number(newRecord.value)
      : newRecord.value;

  newRecordMutation.mutate({ ...newRecord, value });
  setOpen(false);
};

  return (
    <React.Fragment>
        <Button variant='contained' onClick={handleClickOpen}>{habit.name}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
      >
        <DialogTitle id="responsive-dialog-title">
          {"Запись привычки"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>

            <div>
                <Input 
                    placeholder="Дата"
                    onChange={(e) => handleDateChange(e.target.value)}
                    fullWidth
                    value={date}
                    error={!dateStatus}
                />
            </div>
          {
            habit.type==="TEXT" ?
            <Input placeholder="Значение"
                onChange={(e) => handleValueChange(e.target.value)}
                fullWidth  value={newRecord.value}
            />
            :
            habit.type==="NUMBER" ?
            <Input 
                placeholder="Значение"
                type="number" 
                onChange={(e) => {handleValueChange((e.target.value));}}
                fullWidth
                value={newRecord.value !== null ? newRecord.value : ''}/>
            :
            habit.type==="GENERAL" && 
            <div>Статус<Checkbox checked={Boolean(newRecord.value)} onChange={(e)=> handleValueChange(e.target.checked)}></Checkbox></div>
    
          }


        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default NewRecordButton