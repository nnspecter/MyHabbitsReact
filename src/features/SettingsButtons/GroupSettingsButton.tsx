import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useConfigureGroup } from '../../api/mutations';
import { HexColorPicker } from 'react-colorful';
const GroupSetiingsButton = ({group}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const ConfigureMutation = useConfigureGroup();

  const [newSettings, setNewSettings] = useState(
    {
      groupId: group.id,
      name: group.name,
      color: group.color
    }
  )

  useEffect(()=> {
    setNewSettings({
      groupId: group.id,
      name: group.name,
      color: group.color
    })
  }, [group])

  const handleColorChange = useCallback((newColor: string) =>{
    setNewSettings(prev => ({
      ...prev, color: newColor
    }))
  }, []);
    
  const handleNameChange = (newName: string) =>{
    setNewSettings(prev => ({
      ...prev, name: newName
    }))
  };

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleAccept = () => {
      ConfigureMutation.mutate(newSettings);
      setOpen(false);
  };

  return (
    <React.Fragment>
        <Button 
          variant='contained'
          onClick={handleClickOpen}
          sx={{background: "#454545"}}
          style={{ fontSize: "10pt", fontWeight: "bold", borderRadius: "10px"}}
        >
          Редактировать
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
          {"Редактирование группы"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
          <Input placeholder="Название группы" onChange={(e) => handleNameChange(e.target.value)} fullWidth value={newSettings.name} />
          <HexColorPicker color={newSettings.color} onChange={handleColorChange} style={{boxShadow: "0 4px 4px rgba(0,0,0,0.1)"}}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={handleAccept} autoFocus sx={{color: "#454545"}}>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default GroupSetiingsButton