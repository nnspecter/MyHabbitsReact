import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useConfigureGroup } from '@/shared/api/mutations/mutations';
import { HexColorPicker } from 'react-colorful';
import InputLenght from '@/features/Input/InputLenght';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsStyledButton } from '@/features/muiThemes/SettingsStyledButton';
import { HabbitsAllGroups } from '@/shared/api/types/settings/allGroups';



const GroupSetiingsButton = ({group}: {group: HabbitsAllGroups}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
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
        <SettingsStyledButton
          variant='contained'
          onClick={handleClickOpen}
          sx={{background: "var(--buttonColor)"}}
        >
          <div className='smallFont1' style={{color: "var(--background)", display: "flex"}}><SettingsIcon/></div>
        </SettingsStyledButton>

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
          <Input 
            placeholder="Название группы"
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
            value={newSettings.name}
            inputProps={{ maxLength: 25 }}
            endAdornment={
              <InputAdornment position="end">
                <InputLenght valueLenght={newSettings.name.length}/>
              </InputAdornment>
            }
         />
          <HexColorPicker color={newSettings.color} onChange={handleColorChange} style={{boxShadow: "0 4px 4px rgba(0,0,0,0.1)"}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: "#454545"}}>
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