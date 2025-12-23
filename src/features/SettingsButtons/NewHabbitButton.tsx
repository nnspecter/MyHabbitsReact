import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useAddHabit} from '../../api/mutations';
import InputLenght from '../Input/InputLenght';
const NewHabitButton = ({groupId}) => {
    const [habitName, setHabitName] = useState("");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const addMutation = useAddHabit();
    const [type, setType] = useState("GENERAL");
    const [hidden, setHidden] = useState(false);
    


    const handleHiddenChange = (event) => {
      setHidden(event.target.value);
    };

    const handleTypeChange = (event) => {
      setType(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
      addMutation.mutate({groupId: groupId, name: habitName, type: "GENERAL", hidden: false});
        setOpen(false);
    };

  return (
    <React.Fragment>
        <Button 
          variant='contained'
          onClick={handleClickOpen}
          sx={{maxWidth: "20px", background: "#454545"}}
          style={{ fontSize: "12pt", fontWeight: "bold", borderRadius: "5px", height: "30px"}}
        >
          +
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
              placeholder="Название привычки"
              onChange={(e) => setHabitName(e.target.value)}
              fullWidth
              inputProps={{ maxLength: 25 }}
              endAdornment={
                <InputAdornment position="end">
                  <InputLenght valueLenght={habitName.length}/>
                </InputAdornment>
              }
            />
            
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Age"
              onChange={handleTypeChange}
            >
              <MenuItem value={"GENERAL"}>Обычный</MenuItem>
              <MenuItem value={"NUMBER"}>Число</MenuItem>
              <MenuItem value={"TEXT"}>Текст</MenuItem>
              <MenuItem value={"TIME"}>Время</MenuItem>
            </Select>
          </FormControl>

         <div style={{display:"flex", alignItems: "center"}}>Скрыть<Checkbox></Checkbox></div>

        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
          <Button autoFocus onClick={handleClose} sx={{color: "#454545"}}>
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