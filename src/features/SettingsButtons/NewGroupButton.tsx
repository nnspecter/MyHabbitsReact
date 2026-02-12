import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useAddGroup } from '@/shared/api/mutations/mutations';
import { HexColorPicker } from 'react-colorful';
import InputLenght from '@/features/Input/InputLenght';


const NewGroupButton = () => {
    const [color, setColor] = useState("#aabbcc");
    const [groupName, setGroupName] = useState("");
    const [open, setOpen] = React.useState(false);
    const addMutation = useAddGroup();

    const handleColorChange = useCallback(() =>{
      setColor(color);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
      addMutation.mutate({name: groupName, color: color});
        setOpen(false);
    };

  return (
    <React.Fragment>
        <Button variant='contained'
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
          {"Создание новой группы"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
          <Input 
            placeholder="Название группы"
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 25 }}
            endAdornment={
              <InputAdornment position="end">
                <InputLenght valueLenght={groupName.length}/>
              </InputAdornment>
            }
          />
          <HexColorPicker color={color} onChange={handleColorChange}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={handleAccept} autoFocus sx={{color: "#454545"}}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default NewGroupButton