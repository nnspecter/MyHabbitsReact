import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import React, { use, useCallback, useEffect, useState } from 'react'
import { useAddHabit, useDeleteGroup } from '../../api/mutations';
import { HexColorPicker } from 'react-colorful';
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
        <Button variant='contained' sx={{maxWidth: "20px"}} onClick={handleClickOpen}>+</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
      >
        <DialogTitle id="responsive-dialog-title">
          {"Создание привычки"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>

          <Input placeholder="Название привычки" onChange={(e) => setHabitName(e.target.value)} fullWidth />

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
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default NewHabitButton