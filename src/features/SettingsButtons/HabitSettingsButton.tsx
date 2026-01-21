import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useConfigureHabit } from '@/api/mutations';
import { ConfigureHabbit, Habit} from '@/api/api';
import { useAllGroups } from '@/api/queries';
import InputLenght from '@/features/Input/InputLenght';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsStyledButton } from '@/features/muiThemes/SettingsStyledButton';


interface HabitSettingsButtonProps {
  habit: Habit;
  groupId: number
}


const HabitSettingsButton: React.FC<HabitSettingsButtonProps> = ({habit, groupId})   => {
  const {data: allGroupsQuery} = useAllGroups();
  const [newHabit, setNewHabit] = useState<ConfigureHabbit>({
    habitId: habit.id,
    groupId: groupId,
    name: habit.name,
    hidden: habit.hidden,
    scheduleN: 1
  });

  useEffect(() => {
    setNewHabit({
      habitId: habit.id,
      groupId: groupId,
      name: habit.name,
      hidden: habit.hidden,
      scheduleN: 1
    });
}, [habit, groupId]);
    
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const configureMutation = useConfigureHabit()
  const handleNameChange = (newName: string) => {
    setNewHabit(prev => ({...prev, name: newName}))
  }

  const handleHiddenChange = (newHidden: boolean) => {
    setNewHabit(prev => ({...prev, hidden: newHidden}));
  };

  const handleGroupChange = (newGroupId: number) => {
    setNewHabit(prev => ({...prev, groupId: newGroupId}))
  }

    

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleAccept = () => {
    if(newHabit.name !== habit.name || newHabit.hidden !== habit.hidden || newHabit.groupId !== groupId) {
      configureMutation.mutate(newHabit);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
        <SettingsStyledButton
          variant='contained'
          onClick={handleClickOpen}
          sx={{background: "#454545"}}
          
        >
          <div className='smallFont1' style={{color: "#ffff", display: "flex"}}>
            <SettingsIcon/>
          </div>
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
          {"Параметры привычки"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>

          <Input
            placeholder="Название привычки"
            onChange={(e) => handleNameChange(e.target.value)}
            fullWidth
            value={newHabit.name}
            inputProps={{ maxLength: 25 }}
            endAdornment={
              <InputAdornment position="end">
                <InputLenght valueLenght={newHabit.name.length}/>
              </InputAdornment>
            }
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Группа</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newHabit.groupId}
              label="Группа"
              onChange={e => handleGroupChange(e.target.value as number)}
            >
              {allGroupsQuery?.data && allGroupsQuery.data.map(group => (
                <MenuItem value={group.id}>{group.name}</MenuItem>
              ))}
              
              
            </Select>
          </FormControl>

         <div style={{display:"flex", alignItems: "center"}}>
            Скрыть
            <Checkbox 
              onChange={(e)=> handleHiddenChange(e.target.checked)}
              checked={newHabit.hidden}
              sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}
            >
            </Checkbox>
          </div>

        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
          <Button autoFocus onClick={handleClose} sx={{color: "#454545"}}>
            Отмена
          </Button>
          <Button onClick={handleAccept} autoFocus sx={{color: "#454545"}}>
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default HabitSettingsButton