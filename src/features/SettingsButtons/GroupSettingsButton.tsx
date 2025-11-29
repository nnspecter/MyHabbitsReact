import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { useConfigureGroup } from '../../api/mutations';
import { HexColorPicker } from 'react-colorful';
const GroupSetiingsButton = ({group}) => {
    const [color, setColor] = useState("#aabbcc");
    const [habitName, setGroupName] = useState("");
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const ConfigureMutation = useConfigureGroup();

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
        ConfigureMutation.mutate({ groupId: group.id, name: habitName, color: color});
        setOpen(false);
    };

  return (
    <React.Fragment>
        <Button variant='contained' onClick={handleClickOpen}>Редактировать</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
      >
        <DialogTitle id="responsive-dialog-title">
          {"Редактирование группы"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
          <Input placeholder="Название группы" onChange={(e) => setGroupName(e.target.value)} fullWidth />
          <HexColorPicker color={color} onChange={handleColorChange}/>
        </DialogContent>
        <DialogActions>
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

export default GroupSetiingsButton