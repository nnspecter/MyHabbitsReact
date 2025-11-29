import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import { useDeleteHabit } from '../../api/mutations';

const DeleteHabitButton = ({habitId}: {habitId: number}) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const deleteMutation = useDeleteHabit();
      
    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
        console.log("Delete habit", id);  
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <React.Fragment>
        <Button variant="contained" color='error' onClick={handleClickOpen}>Удалить</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableScrollLock
      >
        <DialogTitle id="responsive-dialog-title">
          {"Удалить привычку?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Если вы удалите привычку, то все записи этой привычки, также будут удалены. Вы уверены, что хотите удалить эту группу?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={() => { handleClose(); handleDelete(habitId);}} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default DeleteHabitButton