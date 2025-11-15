import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, useMediaQuery, useTheme } from '@mui/material';
import React, { use, useEffect, useState } from 'react'
import { useAddGroup, useDeleteGroup } from '../../api/mutations';
import { HexColorPicker } from 'react-colorful';
const NewGroupButton = () => {
    const [color, setColor] = useState("#aabbcc");
    const [groupName, setGroupName] = useState("");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const addMutation = useAddGroup();

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
        <Button variant='contained' sx={{maxWidth: "20px"}} onClick={handleClickOpen}>+</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
      >
        <DialogTitle id="responsive-dialog-title">
          {"Создание новой группы"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
          <Input placeholder="Название группы" onChange={(e) => setGroupName(e.target.value)} fullWidth />
          <HexColorPicker color={color} onChange={setColor}/>
        </DialogContent>
        <DialogActions>
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

export default NewGroupButton