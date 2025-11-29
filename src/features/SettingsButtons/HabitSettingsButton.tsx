import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import React, { use, useCallback, useEffect, useState } from 'react'
import { useConfigureHabit } from '../../api/mutations';
import { ConfigureHabbit, Habbit} from '../../api/api';
import { useAllGroups } from '../../api/queries';

interface HabitSettingsButtonProps {
  habit: Habbit;
  groupId: number
}


const HabitSettingsButton: React.FC<HabitSettingsButtonProps> = ({habit, groupId})   => {
    const {data: allGroupsQuery, isPending: isPendingAllGroups} = useAllGroups();
    const [newHabit, setNewHabit] = useState<ConfigureHabbit>({
      habitId: habit.id,
      groupId: groupId,
      name: habit.name,
      hidden: habit.hidden,
    });
    
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
        <Button variant='contained' onClick={handleClickOpen}>Настроить</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
      >
        <DialogTitle id="responsive-dialog-title">
          {"Параметры привычки"}
        </DialogTitle>
        <DialogContent style={{display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>

          <Input placeholder="Название привычки" onChange={(e) => handleNameChange(e.target.value)} fullWidth  value={newHabit.name}/>

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

         <div style={{display:"flex", alignItems: "center"}}>Скрыть<Checkbox onChange={(e)=> handleHiddenChange(e.target.checked)} checked={newHabit.hidden}></Checkbox></div>

        </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={handleAccept} autoFocus>
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default HabitSettingsButton